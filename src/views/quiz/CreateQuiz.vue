<template>
  <DefaultLayout>
    <div class="create-quiz container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
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
                  <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description:</label>
                  <textarea
                    class="form-control"
                    v-model="quiz.description"
                    rows="3"
                    required
                  ></textarea>
                  <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
                </div>

                <div class="mb-3">
                  <label for="category" class="form-label">Category:</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="quiz.category"
                    required
                  />
                  <div v-if="errors.category" class="error-message">{{ errors.category }}</div>
                </div>

                <div class="mb-3">
                  <label for="visibility" class="form-label">Visibility:</label>
                  <select
                    class="form-control"
                    v-model="quiz.visibility"
                    required
                  >
                    <option :value="0">Private</option>
                    <option :value="1">Public</option>
                  </select>
                  <div v-if="errors.visibility" class="error-message">{{ errors.visibility }}</div>
                </div>

                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">Create Quiz</button>
                  <button type="reset" class="btn btn-danger ms-2">Reset</button>
                  <button type="button" class="btn btn-secondary ms-2" @click="goBack">Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
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
    submitQuiz() {
      this.errors = {};

      if (!this.quiz.title.trim()) this.errors.title = 'Title is required';
      if (!this.quiz.description.trim()) this.errors.description = 'Description is required';
      if (!this.quiz.category.trim()) this.errors.category = 'Category is required';
      if (this.quiz.visibility !== 0 && this.quiz.visibility !== 1)
        this.errors.visibility = 'Visibility must be 0 or 1';

      if (Object.keys(this.errors).length === 0) {
        console.log('Submitting quiz:', this.quiz);
        // API call can be placed here
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style src="../../style/CreateQuiz.scss" scoped lang="scss" />
