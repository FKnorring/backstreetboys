<template>
  <div class="form">
    <h1>Complete Profile</h1>
    <div v-show="stage == 1" class="name-screen">
      <input type="text" placeholder="Name" v-model="name" />
      <input type="number" placeholder="Age" v-model="age" min="18" />
      <input type="tel" placeholder="Phone number" v-model="phonenumber" />
      <input type="text" placeholder="Occupation" v-model="occupation" />
    </div>
    <div v-show="stage == 2" class="gender-screen">
      <select placeholder="Choose" required v-model="gender">
        <option value="" disabled selected>Choose gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <div v-show="stage == 3" class="interest-screen">
      <label>Interests: </label><br />
      <Interests @update="getInterests($event)" />
    </div>
    <div v-show="stage == 4" class="bio-screen">
      <textarea
        placeholder="Tell us about yourself!"
        rows="4"
        cols="50"
        max-length="200"
        v-model="bio"
      />
    </div>
    <input
      v-show="stage == 5"
      type="button"
      @click="makeProfile"
      value="Complete my profile!"
    />
    <p>You can always edit your profile later</p>
  </div>
  <div class="navigators">
    <fa class="icon" @click="prev" icon="caret-left" />
    <fa class="icon" @click="next" icon="caret-right" />
  </div>
</template>
<script>
import { userService } from "../services/userService";
import Interests from "../components/Interests.vue";
export default {
  data() {
    return {
      stage: 1,
      name: "",
      gender: "",
      phonenumber: "",
      age: "",
      occupation: "",
      interests: [],
      selectedInterests: 0,
      bio: "",
      userId: -1,
    };
  },
  methods: {
    async makeProfile() {
      if (this.selectedInterests == 5) {
        await userService.makeProfile(this.getProfileData());
        this.$router.push("/profile");
      } else {
        alert("Select 5 interests");
      }
    },
    getInterests(e) {
      [this.interests, this.selectedInterests] = e;
      console.log(this.interests);
      console.log(this.selectedInterests);
    },
    getProfileData() {
      let profile = {};
      profile.name = this.name;
      profile.gender = this.gender;
      profile.phonenumber = this.phonenumber;
      profile.age = this.age;
      profile.occupation = this.occupation;
      profile.interests = this.interests;
      profile.weights = profile.interests.map((interest) => {
        return interest ? 1 : 0;
      });
      profile.bio = this.bio;
      profile.myEvents = [];
      profile.userId = this.userId;
      console.log(profile);
      return profile;
    },
    next() {
      if (this.stage != 5) this.stage++;
    },
    prev() {
      if (this.stage != 1) this.stage--;
    },
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).user.id;
  },
  components: { Interests },
};
</script>
<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
textarea {
  resize: none;
}
.navigators {
  display: flex;
  position: relative;
  place-content: center;
  flex-direction: row;
}

.icon {
  margin: 0 0.25rem;
  font-size: 4rem;
  transition: visibility 0.5s ease;
}

.show {
  visibility: visible;
}

.name-screen {
  display: flex;
  flex-direction: column;
  outline: solid 1px #ddd;
  border-radius: 10px;
  background: #eee;
}

input {
  border: none;
  padding: 10px;
  margin: 1px;
  background: #fff;
  appearance: none;
}

input:focus {
  outline: none;
}
</style>
