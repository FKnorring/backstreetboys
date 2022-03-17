<template>
  <div class="center">
      <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.center {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
  border: 7px solid #f3f3f3;
  border-top: 7px solid #de9190;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
