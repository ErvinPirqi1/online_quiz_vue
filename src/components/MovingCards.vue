<template>
  <div class="moving-cards-wrapper">
    <div v-if="quizzes.length === 0" class="no-quizzes">
      No quizzes available at the moment.
    </div>

    <div v-else class="carousel-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
      <button @click="prevPage" class="arrow-btn">←</button>

      <div class="carousel">
        <div v-for="quiz in visibleQuizzes" :key="quiz.id" class="quiz-card">
          <img src="../assets/img/quiz_background.jpg" alt="Quiz Image" class="quiz-image" />
          <div class="quiz-card-body">
            <h5 class="quiz-title">{{ quiz.title }}</h5>
            <p class="quiz-meta"><strong>Category:</strong> {{ quiz.category }}</p>
            <p class="quiz-description">{{ quiz.description }}</p>
          </div>
          <div class="quiz-card-footer text-center">
            <RouterLink :to="`/quiz/${quiz.id}`" class="btn btn-primary">Open Quiz</RouterLink>
          </div>
        </div>
      </div>

      <button @click="nextPage" class="arrow-btn">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const quizzes = ref([]);
const startIndex = ref(0);
const pageSize = 3;
let scrollInterval;

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8080/api/quizzes");
    const data = await res.json();
    quizzes.value = Array.isArray(data) ? data.filter(q => q && q.title && q.description) : [];
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    quizzes.value = [];
  }

  startAutoScroll();
});

const visibleQuizzes = computed(() =>
  quizzes.value.slice(startIndex.value, startIndex.value + pageSize)
);

function nextPage() {
  startIndex.value = (startIndex.value + pageSize) % quizzes.value.length;
}

function prevPage() {
  startIndex.value = startIndex.value === 0
    ? quizzes.value.length - pageSize
    : startIndex.value - pageSize;
}

function startAutoScroll() {
  scrollInterval = setInterval(() => {
    nextPage();
  }, 3000);
}

function pauseScroll() {
  clearInterval(scrollInterval);
}

function resumeScroll() {
  startAutoScroll();
}
</script>


<style lang="scss" scoped src="../style/MovingCards.scss"></style>
