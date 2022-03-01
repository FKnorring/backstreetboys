<template>
  <div class="page">
    <div class="profile">
      <div class="header">
        <h1>{{ username }}</h1>
        <img :src="picture" alt="" />
      </div>
      <div class="content">
        <h2 class="key-val">
          Age
          <p>{{ age }}</p>
        </h2>
        <h2 class="key-val">
          Gender
          <p>{{ gender }}</p>
        </h2>
        <h2 class="key-val">
          Occupation
          <p>{{ occupation }}</p>
        </h2>
        <h2>Interests</h2>
        <Interests />
        <h3>Bio:</h3>
        <p>{{ bio }}</p>
        <fa icon="dog" />
      </div>

      <button @click="removeAcc">Remove Account</button>
    </div>
  </div>
</template>

<script>
import { dbService } from "../../services/dbservice";
import Interests from "./Interests.vue";

export default {
  name: "Profile",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: {},
      id: 1,
      username: "USERNAME",
      gender: "GENDER",
      age: "AGE",
      occupation: "OCCUPATION",
      bio: "",
      previousMatches: "",
    };
  },
  async created() {
    let profile = await dbService.getProfile(this.userId);
    this.username = profile[0].name;
    this.gender = profile[0].gender;
    this.occupation = profile[0].occupation;
    this.age = profile[0].age;
    this.bio = profile[0].bio;
    this.previousMatches = [];
  },
  computed: {
    picture: function () {
      return (
        "https://randomuser.me/api/portraits/" +
        (this.gender == "Male" ? "men" : "women") +
        "/" +
        this.userId +
        ".jpg"
      );
    },
  },
  components: { Interests },
};
</script>

<style scoped>
.header {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.header h1 {
  font-weight: 800;
}

.header img {
  border-radius: 100%;
  border: solid 2px black;
  width: 90px;
  margin: 1em;
}

.header::after {
  content: "";
  position: absolute;
  background: black;
  width: 100%;
  height: 2px;
  top: 100%;
}

.profile {
  width: 25%;
  display: flex;
  flex-direction: column;
  text-align: left;
  place-content: center;
}

.content {
  margin: 1em;
}

.page {
  display: flex;
  place-content: center;
}

.key-val {
  display: flex;
  align-items: center;
}

.key-val p {
  font-weight: 100;
  font-size: 0.75em;
  margin: 0 2em;
}
</style>
