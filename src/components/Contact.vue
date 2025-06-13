<template>
  <section id="contact" class="contact-section mt-5 mb-5">
    <h2 class="text-center mb-4">Contact Us</h2>
    <p class="text-center">Feel free to reach out to us using the form below.</p>

    <form class="contact-form mx-auto">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="form.message" id="message" rows="5" required></textarea>
      </div>

      <button type="submit" @click.prevent="handleSubmit">Send Message</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      alert(`Message sent!\nName: ${this.form.name}\nEmail: ${this.form.email}`);
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped lang="scss" src="../style/Contact.scss"></style>
