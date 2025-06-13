<template>
  <DefaultLayout>
    <template #default>
      <div class="modify-quiz container mt-5" v-if="quiz && !loading && quiz.id">
        <h2>Edit Quiz</h2>

        <!-- Quiz info form -->
        <form @submit.prevent="updateQuiz" class="mb-5">
          <div>
            <label>Title</label>
            <input v-model="quiz.title" type="text" required />
          </div>
          <div>
            <label>Description</label>
            <textarea v-model="quiz.description" required></textarea>
          </div>
          <div>
            <label>Category</label>
            <input v-model="quiz.category" type="text" required />
          </div>
          <div>
            <label>Visibility</label>
            <select v-model.number="quiz.visibility" required>
              <option :value="0">Private</option>
              <option :value="1">Public</option>
            </select>
          </div>

          <button type="submit">Save Quiz Info</button>
        </form>

        <h3>Questions</h3>

        <div
          v-for="(question, qIndex) in questions"
          :key="question.id"
          class="question-edit mb-4"
        >
          <form @submit.prevent="updateQuestion(question.id, qIndex)">
            <div>
              <label>Question Text</label>
              <input v-model="question.questionText" type="text" required />
            </div>

            <div
              v-for="(answer, aIndex) in question.answers"
              :key="answer.id"
              class="answer-edit"
            >
              <label>Answer {{ aIndex + 1 }}</label>
              <input v-model="answer.text" type="text" required placeholder="Answer text" />
              <label>
                <input type="checkbox" v-model="answer.isCorrect" />
                Correct
              </label>
            </div>

            <button type="submit" class="mt-2">Save Question</button>
          </form>
        </div>

        <RouterLink
          v-if="quiz"
          :to="`/quiz/${quiz.id}`"
          class="btn btn-primary mt-4"
        >
          Quiz Details
        </RouterLink>
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
  components: { DefaultLayout },
  data() {
    return {
      quiz: null,
      questions: [],
      errors: {},
      loading: false,  // <-- added loading state
    };
  },
  async created() {
    await this.fetchQuizWithQuestions();
  },
  methods: {
    async fetchQuizWithQuestions() {
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const quizId = this.$route.params.id;

        const response = await axios.get(
          `http://localhost:8080/api/quizzes/${quizId}/details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.quiz = response.data.quiz;
        this.questions = response.data.questions;
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      } finally {
        this.loading = false;
      }
    },

    async updateQuiz() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:8080/api/quizzes/${this.quiz.id}`,
          {
            title: this.quiz.title,
            description: this.quiz.description,
            category: this.quiz.category,
            visibility: this.quiz.visibility,
            status: this.quiz.status,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Quiz updated successfully");
      } catch (error) {
        console.error("Error updating quiz:", error);
        alert("Failed to update quiz");
      }
    },

    async updateQuestion(questionId, qIndex) {
      try {
        const token = localStorage.getItem("token");
        const question = this.questions[qIndex];
        const quizId = this.quiz.id;

        const payload = {
          questionText: question.questionText,
          questionType: question.questionType,
          answers: question.answers.map((a) => ({
            id: a.id,
            text: a.text,
            isCorrect: a.isCorrect,
          })),
        };

        await axios.put(
          `http://localhost:8080/api/quizzes/${quizId}/questions/${questionId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert(`Question ${questionId} updated successfully`);
      } catch (error) {
        console.error("Error updating question:", error);
        alert("Failed to update question");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modify-quiz {
  max-width: 800px;
  margin: 50px auto;

  label {
    display: block;
    margin: 8px 0 4px;
  }

  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 6px 8px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .question-edit {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  .answer-edit {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
