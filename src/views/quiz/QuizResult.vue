<template>
  <div>
    <p>Component {{ componentName }} loaded successfully.</p>
  </div>
</template>

<script setup>
const componentName = 'YourComponentName';
console.log(`Component ${componentName} loaded successfully.`);
</script>

<style scoped>
p {
  color: green;
  font-weight: bold;
}
</style>
