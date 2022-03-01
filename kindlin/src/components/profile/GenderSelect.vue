<template>
  <div class="icon-container">
    <fa
      @click="selectGender('Male')"
      class="gender"
      :class="{ selected: gender === 'Male' }"
      icon="person"
      size="8x"
    />
    <fa
      @click="selectGender('Female')"
      class="gender"
      :class="{ selected: gender === 'Female' }"
      icon="person-dress"
      size="8x"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: "none",
    };
  },
  methods: {
    selectGender(gender) {
      if (this.gender === gender) {
        this.gender = "none";
        this.$emit("update", this.gender);
      } else {
        this.gender = gender;
        this.$emit("update", this.gender);
      }
    },
  },
};
</script>

<style scoped>
.icon-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.gender {
  margin: 2rem;
  color: black;
}

.gender:hover {
  cursor: pointer;
}

.selected {
  color: green !important;
}
</style>
