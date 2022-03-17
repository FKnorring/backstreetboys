<template>
  <div class="bg"></div>
</template>

<script>
export default {
  name: "BG",
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 800px;
  position: absolute;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  z-index: -200;
  box-shadow: inset 0 -200px 100px white;
  border: none;
  outline: none;
}
</style>
