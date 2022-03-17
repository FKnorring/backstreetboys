<template>
  <div class="log-cont">
    <fa icon="fire" :size="iconsize" color="#fa6d6b" />
    <h1>Kindlin</h1>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    size: String,
    text: Boolean,
  },
  computed: {
    iconsize: function () {
      switch (this.size) {
        case "1":
          return "1x";
        case "2":
          return "2x";
        case "3":
          return "3x";
        case "4":
          return "4x";
        case "5":
          return "5x";
        case "6":
          return "6x";
        default:
          return "1x";
      }
    },
  },
};
</script>

<style scoped>
.log-cont {
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  height: 144px;
}

h1 {
  color: #fa6d6b;
  font-weight: 800;
  margin: 0;
}
</style>
