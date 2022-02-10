<template>
  <div class="form">
    <h1>Complete Profile</h1>
    <input type="text" placeholder="Name" v-model="name" />
    <input type="number" placeholder="Age" v-model="age" min="18" />
    <input type="text" placeholder="Gender" v-model="gender" />
    <input type="text" placeholder="Occupation" v-model="occupation" />
    <label>Interests: </label><br />
    <textarea
      placeholder="Tell us about yourself!"
      rows="4"
      cols="50"
      max-length="200"
      v-model="bio"
    />
    <input type="button" @click="updateProfile" value="Complete my profile!" />
  </div>
</template>
<script>
import { userService } from "../services/userService";
export default {
  data() {
    return {
      name: "",
      gender: "",
      age: "",
      occupation: "",
      bio: "",
      userId: -1,
    };
  },
  methods: {
    async updateProfile() {
      await userService.updateProfile(JSON.stringify(this.$data));
      console.log(JSON.stringify(this.$data));
      this.$router.push("/profile");
    },
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).user.id;
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
