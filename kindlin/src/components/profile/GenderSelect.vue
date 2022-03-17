<template>
  <div class="icon-container">
    <fa
      @click="selectGender('Male')"
      class="gender"
      :class="{ selected: gender === 'Male' }"
      icon="person"
      size="6x"
    />
    <fa
      @click="selectGender('Female')"
      class="gender"
      :class="{ selected: gender === 'Female' }"
      icon="person-dress"
      size="6x"
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
  display: flex;
  align-items: center;
  padding: -0.01vw;
  margin-top:8vw;
  margin-bottom: 8vw;
  position: relative;
  background: transparent;
  border: none;
  box-shadow: none;
}

.gender {
  color: black;
}


.gender:hover {
  cursor: pointer;
}

.selected {
  color: green !important;
}
</style>
