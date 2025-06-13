<template>
  <button
    :class="['sidebar-btn', { active: active }]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  active: Boolean,
})
</script>

<style scoped>
.sidebar-btn {
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  color: #eee;
  transition: background-color 0.3s;
}

.sidebar-btn:hover {
  background-color: #444;
}

.sidebar-btn.active {
  background-color: #2196f3;
  font-weight: bold;
}
</style>
