<template>
  <div class="icon-container">
    <fa
      @click="addInterest(index)"
      v-for="(interest, index) in interests"
      :key="interest"
      :class="{ selected: selectedInterests[index] }"
      class="icon"
      :icon="interest"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      interests: [
        "heart",
        "basketball",
        "bicycle",
        "bowling-ball",
        "dumbbell",
        "futbol",
        "person-hiking",
        "brain",
        "person-running",
        "table-tennis-paddle-ball",
        "person-skiing",
        "baseball",
        "archway",
        "volleyball",
        "stopwatch-20",
      ],
      selectedInterests: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
  },
  methods: {
    addInterest(i) {
      if (this.selectedAmnt() < 5 || this.selectedInterests[i])
        this.selectedInterests[i] = !this.selectedInterests[i];
      this.$emit("update", [this.selectedInterests, this.selectedAmnt()]);
    },
    selectedAmnt() {
      return this.selectedInterests.reduce(
        (sum, selected) => sum + (selected ? 1 : 0),
        0
      );
    },
  },
};
</script>

<style scoped>
.icon-container {
  position: relative;
  height: 200px;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(3, auto);
  text-align: center;
  grid-gap: 1rem;
  font-size: 2rem;
  margin: 1rem;
  background: none;
  box-shadow: none;
  border: none;
}

.icon {
  color: black;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border: solid 1px black;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 1px black;
  cursor: pointer;
}

.icon:hover {
  background: none;;
}

.selected {
  background: #888888 !important;
}
</style>
