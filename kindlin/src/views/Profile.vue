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
import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";
import Interests from "../components/profile/Interests.vue";

export default {
  data() {
    return {
      user: {},
      id: 1,
      path: "http://localhost:3000/users/",
      username: "USERNAME",
      gender: "GENDER",
      age: "AGE",
      email: "EMAIL@email.com",
      occupation: "OCCUPATION",
      bio: "",
      previousMatches: "",
    };
  },
  methods: {
    removeAcc() {
      dbService.removeAcc();
      this.$router.push("/login");
    },
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = await dbService.getProfile(this.user.id);
    let profile = await firestoreDB.getProfile(this.user.id);
    this.username = profile[0].name;
    this.gender = profile[0].gender;
    this.email = this.user.email;
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
        this.user.id +
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
