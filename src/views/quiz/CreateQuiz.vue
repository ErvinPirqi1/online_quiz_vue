<template>
  <DefaultLayout>
    <template #default>
      <div class="container mt-5">
        <div class="card mb-4 shadow">
          <div class="card-header text-center">
            <h5 class="card-title">Create a New Quiz</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitQuiz">

              <div class="mb-3">
                <label for="title" class="form-label">Quiz Title:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="quiz.title"
                  required
                  minlength="3"
                  maxlength="100"
                />
                <div class="error-message text-danger" v-if="errors.title">{{ errors.title }}</div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea
                  class="form-control"
                  v-model="quiz.description"
                  rows="3"
                  required
                ></textarea>
                <div class="error-message text-danger" v-if="errors.description">{{ errors.description }}</div>
              </div>

              <div class="mb-3">
                <label for="category" class="form-label">Category:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="quiz.category"
                  required
                />
                <div class="error-message text-danger" v-if="errors.category">{{ errors.category }}</div>
              </div>

              <div class="mb-3">
                <label for="visibility" class="form-label">Visibility:</label>
                <select class="form-control" v-model="quiz.visibility" required>
                  <option value="0">Private</option>
                  <option value="1">Public</option>
                </select>
                <div class="error-message text-danger" v-if="errors.visibility">{{ errors.visibility }}</div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="btn btn-success">Create Quiz</button>
                <button type="reset" class="btn btn-danger" @click="resetForm">Reset</button>
                <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script>
import axios from 'axios';
import DefaultLayout from '../../layouts/DefaultLayout.vue';

export default {
  name: 'CreateQuiz',
  components: { DefaultLayout },
  data() {
    return {
      quiz: {
        title: '',
        description: '',
        category: '',
        visibility: 0,
      },
      errors: {},
    };
  },
  methods: {
    async submitQuiz() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You must be logged in to create a quiz.');
          return;
        }

        const response = await axios.post(
          'http://localhost:8080/api/quizzes',
          this.quiz,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const quizId = response.data;

        this.$router.push(`/quiz/createQuestion/${quizId}`);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors;
        } else {
          console.error('An unexpected error occurred:', error);
          alert('An error occurred while creating the quiz.');
        }
      }
    },
    resetForm() {
      this.quiz = {
        title: '',
        description: '',
        category: '',
        visibility: 0,
      };
      this.errors = {};
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss" src="../../style/CreateQuiz.scss"></style>
