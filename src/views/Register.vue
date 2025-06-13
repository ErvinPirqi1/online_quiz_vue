<template>
  <main class="login-body" ref="registerBody">
    <form class="form-default" @submit.prevent="registerUser">
      <div class="login-form form-box">
        <div class="logo-login">
          <a href="/">
            <img src="/assets/img/logo/loder.png" alt="Logo" />
          </a>
        </div>
        <h2>Register</h2>

        <div class="form-input">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            placeholder="Username"
            required
          />
        </div>

        <div class="form-input">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" placeholder="Name" required />
        </div>

        <div class="form-input">
          <label for="surname">Surname</label>
          <input
            id="surname"
            v-model="form.surname"
            placeholder="Surname"
            required
          />
        </div>

        <div class="form-input">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div class="form-input">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Password"
            required
          />
        </div>

        <div class="form-input">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>

        <div class="form-input role-toggle">
          <label>Role</label>
          <div class="role-buttons">
            <button
              type="button"
              :class="{ active: form.role === 'STUDENT' }"
              @click="form.role = 'STUDENT'"
            >
              Student
            </button>
            <button
              type="button"
              :class="{ active: form.role === 'TEACHER' }"
              @click="form.role = 'TEACHER'"
            >
              Teacher
            </button>
          </div>
        </div>

        <div class="form-input pt-30">
          <input type="submit" value="Register" />
        </div>

        <a href="/login" class="registration">Already have an account? Login</a>

        <div v-if="error">
          <p class="text-danger">{{ error }}</p>
        </div>

        <div v-if="success">
          <p class="text-success">Registration successful! Redirecting to login...</p>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Import router
import axios from "axios";

export default {
  setup() {
    const router = useRouter(); // Use router instance
    const registerBody = ref(null);
    const error = ref(null);
    const success = ref(false);

    const form = ref({
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      email: "",
      role: "TEACHER",
    });

    const registerUser = async () => {
      error.value = null;
      success.value = false;
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          form.value
        );
        console.log("Registration successful:", response.data);
        success.value = true;

        // Redirect to login after 1.5 seconds
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err) {
        error.value =
          err.response?.data?.message ||
          "Registration failed. Please try again.";
      }
    };

    onMounted(() => {
      const $ = window.$;
      if (typeof $.fn.vide !== "undefined") {
        $(registerBody.value).vide("assets/img/login-bg.mp4");
      } else {
        setTimeout(() => {
          if (typeof $.fn.vide !== "undefined") {
            $(registerBody.value).vide("assets/img/login-bg.mp4");
          }
        }, 2000);
      }
    });

    return {
      registerBody,
      form,
      error,
      success,
      registerUser,
    };
  },
};
</script>

<style scoped>
@import "/assets/css/bootstrap.min.css";
@import "/assets/css/style.css";

.text-danger {
  color: red;
}
.text-success {
  color: green;
}

.form-box {
  max-width: 500px;
  margin: auto;
}

.role-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.role-buttons button {
  flex: 1;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #007bff;
  background-color: white;
  color: black;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.role-buttons button.active {
  background-color: #007bff;
  color: white;
}
</style>
