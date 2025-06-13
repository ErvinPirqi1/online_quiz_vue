import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.token) return false;
      try {
        const { exp } = jwtDecode(state.token);
        return exp > Date.now() / 1000;
      } catch {
        return false;
      }
    },
    userRole: (state) => {
      if (!state.token) return null;
      try {
        const { role } = jwtDecode(state.token);
        return role;
      } catch {
        return null;
      }
    },
    isAdmin() {
      return this.userRole === 'ADMIN';
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
