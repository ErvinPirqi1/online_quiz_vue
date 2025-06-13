<template>
  <Preloader />
  <DefaultLayout>
    <div class="container mt-5 section-wrapper">
      <section id="moving-cards" class="mb-5" >
        <MovingCards />
      </section>

      <section id="about" class="mb-5" >
        <About />
      </section>

      <section id="contact" class="mb-5">
        <Contact />
      </section>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import MovingCards from "../components/MovingCards.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Preloader from "../components/Preloader.vue"

export default {
  name: "HomePage",
  components: {
    DefaultLayout,
    MovingCards,
    About,
    Contact,
    Preloader,
  },
};
</script>

<style>
.section-wrapper > section + section {
  padding-top: 30rem;
  padding-bottom: 30rem;
}
</style>
