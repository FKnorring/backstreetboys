<template>
  <div class="form">
    <h1>Complete Profile</h1>
    <input type="text" placeholder="Name" v-model="name" />
    <input type="number" placeholder="Age" v-model="age" min="18" />
    <input type="text" placeholder="Gender" v-model="gender" />
    <input type="text" placeholder="Occupation" v-model="occupation" />
    <label>Interests: </label><br>
    <textarea
      placeholder="Tell us about yourself!"
      rows="4"
      cols="50"
      max-length="200"
      v-model="bio"
    />
    <input type="button" @click="getUser" value="Complete my profile!" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 1,
      path: "http://localhost:3000/users/",
      gender: "",
      age: "",
      occupation: "",
      interest1: "",
      interest2: "",
      interest3: "",
      interest4: "",
      interest5: "",
      bio: "",
    };
  },
};
</script>
<style scooped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
textarea {
  resize: none;
}
</style>
