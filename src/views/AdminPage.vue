<template>
  <div class="admin-dashboard">
    <Sidebar
      :current="selectedMenu"
      @select="selectedMenu = $event"
      @exit="handleExit"
    />
    <main class="content">
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'

// Define dummy views with "not implemented" message
const Welcome = {
  template: `
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <p>Select a section from the sidebar to begin.</p>
    </div>
  `
}
const Users = {
  template: `
    <div>
      <h2>Users Section</h2>
      <p>This dashboard section isn't implemented yet.</p>
    </div>
  `
}
const Quizzes = {
  template: `
    <div>
      <h2>Quizzes Section</h2>
      <p>This dashboard section isn't implemented yet.</p>
    </div>
  `
}
const OtherManagement = {
  template: `
    <div>
      <h2>Other Management</h2>
      <p>This dashboard section isn't implemented yet.</p>
    </div>
  `
}

const selectedMenu = ref('welcome')

const currentComponent = computed(() => {
  switch (selectedMenu.value) {
    case 'users':
      return Users
    case 'quizzes':
      return Quizzes
    case 'management':
      return OtherManagement
    default:
      return Welcome
  }
})

function handleExit() {
  alert('Exiting admin dashboard...')
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}
</style>
