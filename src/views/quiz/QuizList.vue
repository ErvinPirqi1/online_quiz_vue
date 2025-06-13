<template>
  <DefaultLayout>
    <div class="container mt-5" v-if="loaded">

      <!-- Add Quiz Button -->
      <div v-if="isTeacherOrAdmin" class="text-center mb-4">
        <RouterLink to="/quiz/createQuiz" class="btn hero-btn">+ Add New Quiz</RouterLink>
      </div>

      <!-- My Quizzes (Teacher/Admin only) -->
      <section v-if="isTeacherOrAdmin">
        <h2>Your Quizzes</h2>
        <div class="row custom-row">
          <template v-if="myQuizzes.length > 0">
            <QuizCard v-for="quiz in myQuizzes" :key="quiz.id" :quiz="quiz" />
          </template>
          <p v-else class="text-muted">You don’t have any quizzes yet. Create your first quiz!</p>
        </div>
        <hr />
      </section>

      <!-- Quiz Results (Teacher/Admin/Student) -->
      <section v-if="isTeacherOrAdmin || isStudent">
        <h2>Quiz Results</h2>
        <div class="row custom-row">
          <template v-if="participatedQuizzes.length > 0">
            <QuizCard v-for="quiz in participatedQuizzes" :key="quiz.id" :quiz="quiz" />
          </template>
          <p v-else class="text-muted">You haven’t taken any quizzes yet. Take your first quiz!</p>
        </div>
        <hr />
      </section>

      <!-- Other Quizzes (Everyone) -->
      <section>
        <h2>Other Quizzes</h2>
        <div class="row custom-row">
          <template v-if="otherQuizzes.length > 0">
            <QuizCard v-for="quiz in otherQuizzes" :key="quiz.id" :quiz="quiz" />
          </template>
          <p v-else class="text-muted">There are no quizzes available at the moment.</p>
        </div>
      </section>
    </div>

    <div v-else class="text-center mt-5">
      <p>Loading quizzes...</p>
    </div>
  </DefaultLayout>
</template>


<script>
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import QuizCard from '../../components/QuizCard.vue';

export default {
  name: 'QuizList',
  components: { DefaultLayout, QuizCard },
  data() {
    return {
      myQuizzes: [],
      participatedQuizzes: [],
      otherQuizzes: [],
      loaded: false,
    };
  },
  computed: {
    role() {
      return useAuthStore().userRole;
    },
    token() {
      return useAuthStore().token;
    },
    isTeacherOrAdmin() {
      return this.role === 'TEACHER' || this.role === 'ADMIN';
    },
    isStudent() {
      return this.role === 'STUDENT';
    }
  },
  methods: {
    async fetchQuizzes() {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`
        };

        const fetches = [];

        if (this.isTeacherOrAdmin) {
          fetches.push(
            axios.get('/api/quizzes/my', { headers }),
            axios.get('/api/quizzes/participated', { headers }),
            axios.get('/api/quizzes/other', { headers })
          );
        } else if (this.isStudent) {
          fetches.push(
            axios.get('/api/quizzes/participated', { headers }),
            axios.get('/api/quizzes/other', { headers })
          );
        } else {
          fetches.push(axios.get('/api/quizzes/other', { headers }));
        }

        const results = await Promise.all(fetches);

        let i = 0;
        if (this.isTeacherOrAdmin) {
          this.myQuizzes = results[i++].data;
          this.participatedQuizzes = results[i++].data;
          this.otherQuizzes = results[i++].data;
        } else if (this.isStudent) {
          this.participatedQuizzes = results[i++].data;
          this.otherQuizzes = results[i++].data;
        } else {
          this.otherQuizzes = results[i++].data;
        }

      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        this.myQuizzes = [];
        this.participatedQuizzes = [];
        this.otherQuizzes = [];
      } finally {
        this.loaded = true;
      }
    }
  },
  async mounted() {
    await this.fetchQuizzes();
  }
};
</script>

<style src="../../style/QuizList.scss" lang="scss" />
