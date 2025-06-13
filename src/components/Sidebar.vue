<template>
  <aside class="sidebar">
    <div class="menu">
      <SidebarButton
        v-for="item in menuItems"
        :key="item.key"
        :active="current === item.key"
        @click="$emit('select', item.key)"
      >
        {{ item.label }}
      </SidebarButton>
    </div>
    <div class="bottom">
      <SidebarButton @click="$emit('exit')">Exit Dashboard</SidebarButton>
    </div>
  </aside>
</template>

<script setup>
import SidebarButton from './SidebarButton.vue'

const props = defineProps({
  current: String,
})

const menuItems = [
  { key: 'users', label: 'Users' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'management', label: 'Other Management' },
]
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bottom {
  margin-bottom: 10px;
  padding: 0 20px;
}
</style>
