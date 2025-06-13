<template>
    <div class="form-input">
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="error" class="text-danger">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ValidatedInput',
    props: {
      id: String,
      label: String,
      modelValue: [String, Number],
      error: String,
      type: {
        type: String,
        default: 'text',
      },
      placeholder: String,
      required: Boolean,
    },
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  