<template>
  <BG />
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="profile">
    <div class="header">
      <h1>{{ username }}</h1>
      <img :src="picture" alt="" />
    </div>
    <div class="content">
      <fa
        icon="wrench"
        @click="editProfile = !editProfile"
        class="editProfile"
        color="black"
        text="Edit Profile"
        style="cursor: pointer z-index: 9990"
      />
      <h2 class="key-val">
        Age
        <p v-if="!editProfile">{{ age }}</p>
        <p v-else>
          <input type="number" placeholder="Age" v-model="age" min="18" />
        </p>
      </h2>
      <h2 class="key-val">
        Gender
        <p v-if="!editProfile">{{ gender }}</p>
        <GenderSelect v-else />
      </h2>
      <h2 class="key-val">
        Occupation
        <p v-if="!editProfile">{{ occupation }}</p>
        <input
          v-else
          type="text"
          placeholder="Occupation"
          v-model="occupation"
        />
      </h2>
      <h2>Interests</h2>
      <Interests v-if="editProfile" @update="getInterests($event)" />

      <div v-if="!editProfile" class="interests">
        <fa
          v-for="interest in interestList"
          :key="interest"
          class="icon"
          :icon="interest"
          style="color: black; cursor: default"
        />
      </div>
      <h2>Bio</h2>
      <p class="bio" v-if="!editProfile">{{ bio }}</p>
      <textarea
        v-else
        placeholder="Tell us about yourself!"
        rows="4"
        cols="50"
        max-length="200"
        v-model="bio"
      />
    </div>
  </div>
</template>

<script>
import { firestoreDB } from "../services/db";
import GenderSelect from "../components/profile/GenderSelect.vue";
import Interests from "../components/profile/Interests.vue";
import BG from "../components/BG";
import Loader from "../components/Loader.vue"
//import Profile from "../components/profile/Profile.vue";

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
      interests: [],
      previousMatches: "",
      editProfile: false,
      interestList: [],
      allInterests: [
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
      loaded: false,
    };
  },
  methods: {
    removeAcc() {
      console.log("Kontot ska tas bort");
    },
    updateProfile() {
      this.editProfile = false;
    },

    getInterests(e) {
      [this.interests, this.selectedInterests] = e;
      console.log(this.interests);
      console.log(this.selectedInterests);
    },

    getUserInterests() {
      for (let x = 0; x < 15; x++) {
        if (this.interests[x]) {
          this.interestList.push(this.allInterests[x]);
        }
      }
    },
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = await dbService.getProfile(this.user.id);
    let profile = await firestoreDB.getProfile(this.user.id);
    this.username = profile.name;
    this.gender = profile.gender;
    this.email = this.user.email;
    this.occupation = profile.occupation;
    this.age = profile.age;
    this.bio = profile.bio;
    this.interests = profile.interests;
    this.getUserInterests();
    this.previousMatches = [];
    this.loaded = true;
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
  components: { GenderSelect, Interests, BG, Loader },
};
</script>

<style scoped>
.editProfile {
  z-index: 100;
  cursor: pointer;
  position: relative;
  background: #888;
  padding: 4px;
}

.profile {
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 800px;
}

.header {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
}
.header button {
  display: flex;
  justify-content: right;
  align-self: right;
}
.header h1 {
  font-weight: 600;
  z-index: 2;
  position: absolute;
  top: 82%;
  color: black;
  background: white;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.header img {
  top: 0;
  border-radius: 100%;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.5);
  width: 150px;
  margin: 1em;
  z-index: -1;
}

.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
}

.content {
  margin: 1em;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.page {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
}

.key-val {
  display: flex;
  align-items: center;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: transparent;
}

.key-val p {
  font-weight: 100;
  font-size: 0.75em;
  margin: 0 1em;
}

.editProfile {
  display: flex;
  justify-content: center;
  border: 1px black;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
}

.removeProfile {
  display: flex;
  justify-content: center;
  border: 1px black;
  border-radius: 10px;
  align-items: center;
  background-color: red;
}

.interests {
  display: flex;
  justify-content: space-evenly;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: transparent;
}

.bio {
  border: 1px groove;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
  max-height: 100px;
  overflow-y: scroll;
}
</style>
