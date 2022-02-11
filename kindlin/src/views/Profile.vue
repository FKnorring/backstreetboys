<template>
  <div>
    <h1>{{ username }}</h1>
    <h2>{{ age }}</h2>
    <h2>{{ gender }}</h2>
    <h2>{{ occupation }}</h2>
    <h2>{{ email }}</h2>
    <h3>Bio:</h3>
    <p>{{ bio }}</p>
    <button @click="removeAcc">Remove Account</button>
  </div>
</template>

<script>
import { userService } from "../services/userService";

export default {
  data() {
    return {
      id: 1,
      path: "http://localhost:3000/users/",
      username: "USERNAME",
      gender: "GENDER",
      age: "AGE",
      email: "EMAIL@email.com",
      occupation: "OCCUPATION",
      interest1: "interest1",
      interest2: "interest2",
      interest3: "interest3",
      interest4: "interest4",
      interest5: "interest5",
      bio: "",
    };
  },
  methods: {
    removeAcc() {
      userService.removeAcc();
      this.$router.push("/login");
    },
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await userService.getProfile(user.id);
    this.username = profile[0].name;
    this.gender = profile[0].gender;
    this.email = user.email;
    this.occupation = profile[0].occupation;
    this.age = profile[0].age;
    this.bio = profile[0].bio;
  },
};
</script>

<style scoped></style>
