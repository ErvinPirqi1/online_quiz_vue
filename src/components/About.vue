<template>
  <section id="about" class="about-section mt-5">
    <h2 class="text-center mb-4">About Us</h2>
    <p class="about-description">
      Our online quiz platform is designed to make life easier for both teachers
      and students...
    </p>

    <div class="cards-container">
      <div class="card left">
        <Vue3Lottie
          :animation-data="animation1"
          :loop="true"
          :autoplay="true"
          :height="600"
          :width="590"
        />
        <h3>Easy Quiz Creation</h3>
        <p>Create quizzes quickly with intuitive tools.</p>
      </div>

      <div class="card right">
        <Vue3Lottie
          :animation-data="animation3"
          :loop="true"
          :autoplay="true"
          :height="300"
          :width="300"
        />
        <h3>Interactive Learning</h3>
        <p>Engage students with fun and interactive quizzes.</p>
      </div>

      <div class="card left">
        <Vue3Lottie
          :animation-data="animation2"
          :loop="true"
          :autoplay="true"
          :height="300"
          :width="300"
        />
        <h3>Seamless Grading</h3>
        <p>Automate grading to save time and reduce errors.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

// Import animation JSONs
import animation1Str from '../assets/animation/Animation1.json?raw';
import animation2Str from '../assets/animation/Animation2.json?raw';
import animation3Str from '../assets/animation/Animation3.json?raw';

export default defineComponent({
  name: 'About',
  data() {
    return {
      animation1: JSON.parse(animation1Str),
      animation2: JSON.parse(animation2Str),
      animation3: JSON.parse(animation3Str),
    };
  },
});
</script>

<style lang="scss" scoped src="../style/About.scss"></style>
