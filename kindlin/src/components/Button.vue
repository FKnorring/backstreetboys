<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit("toggle-add-event");
    },
  },
};
</script>

<style scoped>
button {
  color: white;
  border-radius: 10px;
}
</style>
