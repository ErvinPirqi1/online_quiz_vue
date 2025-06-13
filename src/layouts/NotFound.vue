<template>
  <div class="container">
    <section class="section error-404 min-vh-60 d-flex flex-column align-items-center justify-content-center">
      <h1>404</h1>
      <h2>The page you are looking for doesn't exist.</h2>
      <router-link to="/" class="btn">Back to home</router-link>
      <br />
      <button class="btn" @click="$router.go(-1)">Back to previous page</button>
      <img src="/assets/img/not-found.svg" class="img-fluid py-2" alt="Page Not Found" />
      <div class="credits">
        Designed by
        <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">BootstrapMade</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>


<style lang="scss" src="../style/NotFound.scss" scoped></style>
