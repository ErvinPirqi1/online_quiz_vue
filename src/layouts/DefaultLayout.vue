<template>
  <head>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
    <link rel="stylesheet" href="/assets/css/slicknav.css" />
    <link rel="stylesheet" href="/assets/css/flaticon.css" />
    <link rel="stylesheet" href="/assets/css/progressbar_barfiller.css" />
    <link rel="stylesheet" href="/assets/css/gijgo.css" />
    <link rel="stylesheet" href="/assets/css/animate.min.css" />
    <link rel="stylesheet" href="/assets/css/animated-headline.css" />
    <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
    <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
    <link rel="stylesheet" href="/assets/css/themify-icons.css" />
    <link rel="stylesheet" href="/assets/css/slick.css" />
    <link rel="stylesheet" href="/assets/css/nice-select.css" />
    <link rel="stylesheet" href="/assets/css/style.css" />
  </head>
  <div>
    <!-- Header -->
    <header>
      <div class="header-area header-transparent">
        <div class="main-header">
          <div class="header-bottom header-sticky">
            <div class="container-fluid">
              <div class="row align-items-center">
                <!-- Logo -->
                <div class="col-xl-2 col-lg-2">
                  <div class="logo">
                    <router-link to="/">
                      <img src="/assets/img/logo/logo.png" alt="Logo" />
                    </router-link>
                  </div>
                </div>
                <!-- Nav Menu -->
                <div class="col-xl-8 col-lg-8">
                  <div
                    class="menu-wrapper d-flex align-items-center justify-content-end"
                  >
                    <div class="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li><router-link to="/">Home</router-link></li>
                          <li><router-link to="/quiz">Quizzes</router-link></li>
                          <li>
                            <router-link to="/" @click.native="scrollToAbout"
                              >About</router-link
                            >
                          </li>
                          <li>
                            <router-link to="/" @click.native="scrollToContact"
                              >Contact</router-link
                            >
                          </li>

                          <!-- Auth Buttons -->
                          <li
                            class="button-header margin-left"
                            v-if="!isAuthenticated"
                          >
                            <router-link class="btn" to="/register"
                              >Join</router-link
                            >
                          </li>
                          <li class="button-header" v-if="!isAuthenticated">
                            <router-link class="btn btn3" to="/login"
                              >Log in</router-link
                            >
                          </li>
                          <li class="button-header" v-if="isAdmin">
                            <router-link class="btn btn3" to="/admin/dashboard"
                              >Admin Panel</router-link
                            >
                          </li>
                          <li class="button-header" v-if="isAuthenticated">
                            <a href="#" class="btn btn3" @click.prevent="logout"
                              >Log out</a
                            >
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Slider Area -->
    <section class="slider-area">
      <div class="slider-passive">
        <div class="single-slider slider-height d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-7 col-md-12">
                <div class="hero__caption">
                  <h1>Online learning<br />platform</h1>
                  <p>
                    Build skills with courses, certificates, and degrees online
                    from world-class universities and companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Slot -->
    <main id="main" class="main">
      <section class="section dashboard">
        <div class="row">
          <slot />
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <div class="footer-wrappper footer-bg">
        <div class="footer-area footer-padding">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-xl-4 col-lg-5 col-md-4 col-sm-6">
                <div class="single-footer-caption mb-50">
                  <div class="footer-logo mb-25">
                    <router-link to="/">
                      <img
                        src="/assets/img/logo/logo2_footer.png"
                        alt="Footer Logo"
                      />
                    </router-link>
                  </div>
                  <div class="footer-tittle">
                    <p>
                      The automated process starts as soon as your clothes go
                      into the machine.
                    </p>
                  </div>
                  <div class="footer-social">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-pinterest-p"></i></a>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-2 col-lg-3 col-md-4 col-sm-5"
                v-for="section in footerSections"
                :key="section.title"
              >
                <div class="single-footer-caption mb-50">
                  <div class="footer-tittle">
                    <h4>{{ section.title }}</h4>
                    <ul>
                      <li v-for="item in section.items" :key="item">
                        <a href="#">{{ item }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom-area">
          <div class="container">
            <div class="footer-border">
              <div class="row d-flex align-items-center">
                <div class="col-xl-12">
                  <div class="footer-copy-right text-center">
                    <p>
                      &copy; {{ new Date().getFullYear() }} All rights reserved
                      | Made with
                      <i class="fa fa-heart" aria-hidden="true"></i> by
                      <a href="https://colorlib.com" target="_blank"
                        >Colorlib</a
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top -->
    <div id="back-top">
      <a title="Go to Top" href="#"><i class="fas fa-level-up-alt"></i></a>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";

export default {
  name: "DefaultLayout",
  data() {
    return {
      footerSections: [
        {
          title: "Our solutions",
          items: [
            "Design & creatives",
            "Telecommunication",
            "Restaurant",
            "Programming",
            "Architecture",
          ],
        },
        {
          title: "Support",
          items: [
            "Design & creatives",
            "Telecommunication",
            "Restaurant",
            "Programming",
            "Architecture",
          ],
        },
        {
          title: "Company",
          items: [
            "Design & creatives",
            "Telecommunication",
            "Restaurant",
            "Programming",
            "Architecture",
          ],
        },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    isAdmin() {
      return this.authStore.isAdmin;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    scrollToAbout() {
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    },
    scrollToContact() {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    },
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
};
</script>
