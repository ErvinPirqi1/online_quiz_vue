<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label>Username</label>
          <input v-model="username" required />
        </div>
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
        error: null,
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post(
            "https://localhost:404/replacehere/api/auth/register",
            {
              username: this.username,
              email: this.email,
              password: this.password,
            }
          );
          // TODO: Handle successful registration
          console.log("Registration successful:", response.data);
        } catch (err) {
          this.error = "Registration failed. Please try again.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  