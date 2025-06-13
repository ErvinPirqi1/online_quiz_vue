<template>
  <DefaultLayout>
    <template #default>
      <div class="container mt-5" v-if="quiz && !loading && quiz.id">
        <div class="card mb-4 shadow">
          <div class="card-body text-center">
            <h1 class="card-title">{{ quiz.title }}</h1>
            <p class="card-text text-muted">{{ quiz.description }}</p>
          </div>
        </div>

        <!-- Questions Section -->
        <div class="questions">
          <h2>Questions</h2>

          <div v-if="questions && questions.length">
            <div
              v-for="question in questions"
              :key="question.id"
              class="card mb-4 shadow"
            >
              <div class="card-body">
                <p class="card-text font-weight-bold">
                  {{ question.questionText }}
                </p>
                <p>
                  Type:
                  <span>{{
                    question.questionType === 0
                      ? "Multiple Choice"
                      : "True/False"
                  }}</span>
                </p>

                <ul
                  class="list-group list-group-flush mb-3"
                  v-if="question.answers && question.answers.length"
                >
                  <li
                    v-for="(answer, index) in question.answers"
                    :key="answer.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span class="text-success">{{ answer.text }}</span>
                    <i>{{ answer.isCorrect ? "✅" : "❌" }}</i>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Buttons Inline -->
          <div class="d-flex justify-content-between mt-4">
            <RouterLink
              :to="`/quiz/edit/${quiz.id}`"
              class="btn btn-primary"
            >
              Edit Quiz
            </RouterLink>

            <RouterLink
              :to="`/quiz/createQuestion/${quiz.id}`"
              class="btn btn-success"
            >
              Add Question
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else-if="loading" class="text-center mt-5">
        <h3>Loading quiz details...</h3>
      </div>

      <div v-else class="text-center mt-5">
        <h3 class="text-danger">Quiz not found or failed to load.</h3>
      </div>
    </template>
  </DefaultLayout>
</template>

<script>
import axios from "axios";
import DefaultLayout from "../../layouts/DefaultLayout.vue";

export default {
  inheritAttrs: false,
  name: "QuizDetails",
  components: { DefaultLayout },
  data() {
    return {
      quizId: this.$route.params.id || this.$route.params.quizId,
      quiz: null,
      questions: [],
      loading: true,
    };
  },
  methods: {
    async fetchQuizDetails() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to view quiz details.");
          this.loading = false;
          return;
        }

        const response = await axios.get(`/api/quizzes/${this.quizId}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.quiz = response.data.quiz || null;
        this.questions = response.data.questions || [];
      } catch (err) {
        console.error("Failed to load quiz details:", err);
        this.quiz = null;
        this.questions = [];
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchQuizDetails();
  },
};
</script>

<style scoped lang="scss" src="../../style/QuizDetails.scss"></style>
