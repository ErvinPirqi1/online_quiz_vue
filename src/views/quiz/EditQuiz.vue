<template>
  <DefaultLayout>
    <div class="edit-quiz-container">
      <h2>Edit Quiz</h2>

      <form @submit.prevent="updateQuiz">
        <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input type="text" id="title" v-model="quiz.title" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" v-model="quiz.description" class="form-control" rows="4" required></textarea>
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Category:</label>
          <input type="text" id="category" v-model="quiz.category" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="visibility" class="form-label">Visibility:</label>
          <select id="visibility" v-model="quiz.visibility" class="form-select" required>
            <option value="0">Private</option>
            <option value="1">Public</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Update Quiz</button>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import DefaultLayout from '../../layouts/DefaultLayout.vue'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id

const quiz = ref({
  title: '',
  description: '',
  category: '',
  visibility: 0
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/quizzes/${quizId}`)
    quiz.value = response.data
  } catch (error) {
    console.error('Failed to load quiz:', error)
  }
})

const updateQuiz = async () => {
  try {
    await axios.put(`/api/quizzes/${quizId}`, quiz.value)
    router.push('/quizzes')
  } catch (error) {
    console.error('Failed to update quiz:', error)
  }
}
</script>

<style src="../../style/EditQuiz.scss" scoped lang="scss" />