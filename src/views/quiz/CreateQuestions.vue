<template>
  <DefaultLayout>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Add Questions to Quiz</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitQuestions">
                <input type="hidden" v-model="quizId" />

                <div id="questionsContainer">
                  <div v-for="(question, index) in questions" :key="index" class="question-form">
                    <h3>Question {{ index + 1 }}</h3>

                    <label :for="`questionText${index}`">Question:</label>
                    <input
                      type="text"
                      :id="`questionText${index}`"
                      v-model="question.questionText"
                      required
                      class="form-control mb-3"
                    />

                    <label :for="`questionType${index}`">Type:</label>
                    <select
                      :id="`questionType${index}`"
                      v-model="question.questionType"
                      @change="toggleOptions(index)"
                      class="form-select mb-3"
                    >
                      <option :value="0">Multiple Choice</option>
                      <option :value="1">True/False</option>
                    </select>

                    <div :id="`optionsContainer${index}`">
                      <div v-for="(answer, optIdx) in question.answers" :key="optIdx" class="mb-3">
                        <label :for="`optionText${optIdx}${index}`">Option {{ optIdx + 1 }}:</label>
                        <input
                          type="text"
                          :id="`optionText${optIdx}${index}`"
                          v-model="answer.text"
                          class="form-control"
                          required
                        />
                        <div class="form-check mt-1">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="answer.isCorrect"
                            :id="`isCorrect${optIdx}${index}`"
                          />
                          <label :for="`isCorrect${optIdx}${index}`" class="form-check-label">Correct?</label>
                        </div>
                      </div>
                    </div>

                    <button type="button" class="btn btn-outline-secondary btn-sm mb-3" @click="addOption(index)">
                      Add Another Option
                    </button>
                    <hr />
                  </div>
                </div>

                <button type="button" class="btn btn-primary me-2" @click="addQuestion">Add Question</button>
                <button type="submit" class="btn btn-success me-2">Submit Questions</button>
                <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import axios from "axios";

export default {
  inheritAttrs: false,
  name: "AddQuestions",
  components: { DefaultLayout },
  data() {
    return {
      quizId: this.$route.params.id || null,
      questions: [],
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({
        questionText: "",
        questionType: 0,
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      });
    },
    addOption(questionIndex) {
      this.questions[questionIndex].answers.push({ text: "", isCorrect: false });
    },
    toggleOptions(questionIndex) {
      const type = this.questions[questionIndex].questionType;
      if (type === 1) {
        this.questions[questionIndex].answers = [
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: false },
        ];
      } else {
        this.questions[questionIndex].answers = [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ];
      }
    },
    async submitQuestions() {
      if (!this.quizId) {
        console.error("Quiz ID is missing!", this.$route.params);
        alert("Quiz ID is required.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:5173/api/quizzes/${this.quizId}/questions`,
          { questions: this.questions },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ensure token is stored properly
            },
          }
        );

        alert("Questions submitted successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error submitting questions:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    console.log("Route params:", this.$route.params);
    console.log("Quiz ID:", this.quizId);
    this.addQuestion();
  },
};
</script>

<style src="../../style/AddQuestion.scss" scoped lang="scss" />
