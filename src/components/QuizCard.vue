<template>
  <div class="col-md-4">
    <div class="custom-card shadow">
      <img :src="quiz.image || defaultImage" alt="Quiz Image" class="card-img-top" />
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
</template>

<script>
import defaultImage from '../assets/img/quiz_background.jpg';
export default {
  props: ['quiz'],
  data() {
    return {
      defaultImage,
    };
  },
};
</script>
