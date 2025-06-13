<template>
  <div v-if="showPreloader" id="preloader-active">
    <div class="preloader d-flex align-items-center justify-content-center">
      <div class="preloader-inner position-relative">
        <div class="preloader-circle"></div>
        <div class="preloader-img pere-text">
          <img src="/assets/img/logo/loder.png" alt="Loading..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      showPreloader: true, // Ensure preloader shows initially
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.showPreloader = false;
        localStorage.setItem("preloaderShown", "true"); // Store flag *after* hiding
      }, 1000);
    });

    // Load external script safely
    if (!document.querySelector(`script[src="/assets/js/main.js"]`)) {
      const script = document.createElement("script");
      script.src = "/assets/js/main.js";
      script.async = true;
      document.body.appendChild(script);
    }
  },
};
</script>

<style scoped>
/* Include preloader styles here or globally */
</style>
