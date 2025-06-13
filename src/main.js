import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie';
import { createPinia } from 'pinia';


createApp(App)
.use(createPinia())
.use(Vue3Lottie)
.use(router)
.mount('#app')

