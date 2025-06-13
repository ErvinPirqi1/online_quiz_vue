<template>
  <main class="login-body" ref="loginBody">
    <form class="form-default" @submit.prevent="loginUser">
      <div class="login-form">
        <div class="logo-login">
          <a href="index.html">
            <img src="/assets/img/logo/loder.png" alt="Logo" />
          </a>
        </div>
        <h2>Login Here</h2>
        <div class="form-input">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-input">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-input pt-30">
          <input type="submit" name="submit" value="login" />
        </div>

        <a href="#" class="forget">Forget Password</a>
        <a href="/register" class="registration">Registration</a>

        <div v-if="error">
          <p class="text-danger">{{ error }}</p>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const loginBody = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();

    async function loginUser() {
      error.value = null;
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            username: username.value,
            password: password.value,
          }
        );

        const { token } = response.data;
        if (token) {
          authStore.setToken(token);
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          router.push(decodedToken.role === "ADMIN" ? "/admin-dashboard" : "/");
        }
      } catch (err) {
        error.value = "Login failed. Please check your credentials.";
      }
    }

    onMounted(() => {
      const $ = window.$;
      if (typeof $.fn.vide !== "undefined") {
        $(loginBody.value).vide("assets/img/login-bg.mp4");
      } else {
        setTimeout(() => {
          if (typeof $.fn.vide !== "undefined") {
            $(loginBody.value).vide("assets/img/login-bg.mp4");
          } else {
            console.error("Vide plugin failed to load!");
          }
        }, 2000);
      }
    });

    return {
      username,
      password,
      error,
      loginUser,
      loginBody,
    };
  },
};
</script>

<style scoped>
@import "/assets/css/bootstrap.min.css";
@import "/assets/css/style.css";

.error {
  color: red;
}
</style>
