<template>
  <DefaultLayout>
    <div class="edit-question container">
      <div class="card shadow">
        <div class="card-header">
          <h5 class="card-title">Modify Question</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateQuestion">
            <div class="mb-3">
              <label for="questionText" class="form-label">Question:</label>
              <input
                type="text"
                id="questionText"
                v-model="question.questionText"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="questionType" class="form-label">Type:</label>
              <select
                id="questionType"
                v-model="question.questionType"
                class="form-select"
                @change="handleTypeChange"
                required
              >
                <option value="0">Multiple Choice</option>
                <option value="1">True/False</option>
              </select>
            </div>

            <div id="optionsContainer">
              <div
                class="mb-3"
                v-for="(answer, index) in question.answers"
                :key="index"
              >
                <label :for="'optionText' + index" class="form-label">
                  Option {{ index + 1 }}:
                </label>
                <input
                  type="text"
                  :id="'optionText' + index"
                  v-model="answer.text"
                  class="form-control"
                  required
                />
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="answer.isCorrect"
                    :id="'isCorrect' + index"
                  />
                  <label class="form-check-label" :for="'isCorrect' + index">
                    Correct?
                  </label>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button type="button" class="btn btn-primary" @click="addOption">
                Add Another Option
              </button>
              <button type="submit" class="btn btn-primary">Update Question</button>
              <router-link to="/quiz" class="btn btn-secondary">Back</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import axios from 'axios';
import DefaultLayout from '../../layouts/DefaultLayout.vue';

export default {
  name: 'EditQuestionPage',
  components: { DefaultLayout },
  data() {
    return {
      question: {
        id: null,
        questionText: '',
        questionType: 0,
        answers: [],
      },
    };
  },
  mounted() {
    this.fetchQuestion();
  },
  methods: {
    fetchQuestion() {
      const questionId = this.$route.params.id;
      axios
        .get(`/api/questions/${questionId}`)
        .then((res) => {
          this.question = res.data;
        })
        .catch((err) => {
          console.error('Failed to fetch question:', err);
        });
    },
    handleTypeChange() {
      if (this.question.questionType === 1) {
        this.question.answers = [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: false },
        ];
      } else if (this.question.answers.length < 2) {
        this.addOption();
        this.addOption();
      }
    },
    addOption() {
      this.question.answers.push({ text: '', isCorrect: false });
    },
    updateQuestion() {
      axios
        .put(`/api/questions/${this.question.id}`, this.question)
        .then(() => {
          this.$router.push('/quiz');
        })
        .catch((err) => {
          console.error('Failed to update question:', err);
        });
    },
  },
};
</script>

<style scoped src="../../style/EditQuestionPage.scss" />
