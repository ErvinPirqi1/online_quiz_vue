<template>
  <DefaultLayout>
    <div class="container mt-5" v-if="loaded">
      <!-- Teacher: Add Quiz button -->
      <div v-if="role === 'ROLE_TEACHER'" class="text-center mb-4">
        <RouterLink to="/quiz/createQuiz" class="btn hero-btn">+ Add New Quiz</RouterLink>
      </div>

      <!-- YOUR QUIZZES (Teacher) or PARTICIPATED QUIZZES (Student) -->
      <section v-if="role === 'ROLE_TEACHER' || role === 'ROLE_STUDENT'">
        <h2>
          {{ role === 'ROLE_TEACHER' ? 'Your Quizzes' : 'Quizzes You Have Taken' }}
        </h2>
        <div class="row custom-row">
          <div
            v-for="quiz in yourQuizzes"
            :key="quiz.id"
            class="col-md-4"
          >
            <div class="custom-card shadow">
              <img
                :src="quiz.image || defaultImage"
                alt="Quiz Image"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="quiz-title">{{ quiz.title }}</h5>
                <p><strong>Author:</strong> {{ quiz.createdByUsername }}</p>
                <p><strong>Category:</strong> {{ quiz.category }}</p>
                <p class="quiz-description">{{ quiz.description }}</p>
              </div>
              <div class="card-footer text-center">
                <RouterLink :to="`/quiz/${quiz.id}`" class="btn btn-primary">Open Quiz</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>

      <!-- OTHER QUIZZES (Everyone sees this) -->
      <section>
        <h2>Other Quizzes</h2>
        <div class="row custom-row">
          <div
            v-for="quiz in otherQuizzes"
            :key="quiz.id"
            class="col-md-4"
          >
            <div class="custom-card shadow">
              <img
                :src="quiz.image || defaultImage"
                alt="Quiz Image"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="quiz-title">{{ quiz.title }}</h5>
                <p><strong>Author:</strong> {{ quiz.createdByUsername }}</p>
                <p><strong>Category:</strong> {{ quiz.category }}</p>
                <p class="quiz-description">{{ quiz.description }}</p>
              </div>
              <div class="card-footer text-center">
                <RouterLink :to="`/quiz/${quiz.id}`" class="btn btn-primary">Open Quiz</RouterLink>
              </div>
            </div>
          </div>
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
import { useAuthStore } from '../../stores/auth';  // adjust path if needed
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import defaultImage from '../../assets/img/quiz_background.jpg';

export default {
  name: 'QuizList',
  components: { DefaultLayout },
  data() {
    return {
      yourQuizzes: [],
      otherQuizzes: [],
      loaded: false,
      defaultImage,
    };
  },
  computed: {
    role() {
      const authStore = useAuthStore();
      return authStore.userRole;  // directly get role from Pinia store
    }
  },
  methods: {
    async fetchQuizzes() {
      try {
        console.log('Fetching quizzes for role:', this.role);

        if (!this.role) {
          const response = await axios.get('/api/quizzes');
          this.otherQuizzes = response.data;
        } else if (this.role === 'TEACHER') {
          const yourRes = await axios.get('/api/quizzes/my');
          const otherRes = await axios.get('/api/quizzes/other');
          this.yourQuizzes = yourRes.data;
          this.otherQuizzes = otherRes.data;
        } else if (this.role === 'ROLE_STUDENT') {
          const participatedRes = await axios.get('/api/quizzes/participated');
          const otherRes = await axios.get('/api/quizzes/other');
          this.yourQuizzes = participatedRes.data;
          this.otherQuizzes = otherRes.data;
        }
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        this.yourQuizzes = [];
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
