<template>
  <div class="container mt-5" id="cont" v-if="quiz">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="quiz-details">
          <h2 class="quiz-title">{{ quiz.title }}</h2>
          <p class="quiz-meta">Category: {{ quiz.category }}</p>
          <p class="quiz-meta">Created by: {{ quiz.createdByUsername }}</p>
          <p class="quiz-description">{{ quiz.description }}</p>
        </div>

        <div class="quiz-actions" v-if="quiz.visibility === 1 || isAuthenticated">
          <RouterLink :to="`/quiz/start/${quiz.id}`" class="btn btn-primary btn-lg">Start Quiz</RouterLink>
        </div>

        <div class="btn-container" v-if="isQuizCreator">
          <RouterLink :to="`/quiz/edit/${quiz.id}`" class="btn btn-primary">Modify Quiz</RouterLink>
          <RouterLink :to="`/quiz/toggleVisibility/${quiz.id}`" class="btn btn-primary">Toggle Visibility</RouterLink>
          <RouterLink :to="`/quiz/details/${quiz.id}`" class="btn btn-success">Quiz Details</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const quiz = ref(null)
const isAuthenticated = ref(false)
const isQuizCreator = ref(false)

const route = useRoute()

onMounted(async () => {
  try {
    const quizId = route.params.id
    const res = await axios.get(`/api/quiz/${quizId}`)
    quiz.value = res.data.quiz
    isAuthenticated.value = res.data.isAuthenticated
    isQuizCreator.value = res.data.isQuizCreator
  } catch (error) {
    console.error('Failed to fetch quiz details:', error)
  }
})
</script>

<style src="../../style/QuizView.scss" scoped lang="scss" />