<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>

export default {
  name: "Header",
  props: {
    title: String,
    showAddEvent: Boolean,
  },
  components: {
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>