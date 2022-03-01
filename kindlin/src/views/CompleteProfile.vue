<template>
  <div class="page">
    <div class="stage">
      <div class="selector">
        <button @click="stage = 1" :class="{ green: submitted[0] }">1</button>
        <p>Complete Profile</p>
      </div>
      <div class="selector">
        <button @click="stage = 2" :class="{ green: submitted[1] }">2</button>
        <p>Select Gender</p>
      </div>
      <div class="selector">
        <button @click="stage = 3" :class="{ green: submitted[2] }">3</button>
        <p>Select Interests</p>
      </div>
      <div class="selector">
        <button @click="stage = 4" :class="{ green: submitted[3] }">4</button>
        <p>Complete Bio</p>
      </div>
    </div>
    <div class="container">
      <div class="form">
        <div v-show="stage == 1">
          <h1>Complete Profile</h1>
          <div class="name-screen">
            <input type="text" placeholder="Name" v-model="name" />
            <input type="number" placeholder="Age" v-model="age" min="18" />
            <input
              type="tel"
              placeholder="Phone number"
              v-model="phonenumber"
            />
            <input type="text" placeholder="Occupation" v-model="occupation" />
          </div>

          <button @click="submit()" class="next">Submit</button>
        </div>

        <div v-show="stage == 2" class="gender-screen">
          <h1>Select Gender</h1>
          <GenderSelect @update="getGender($event)" />
          <button @click="prev()" class="next">Previous</button>
          <button @click="submit()" class="next">Submit</button>
        </div>
        <div v-show="stage == 3" class="interest-screen">
          <h1>Select Interests</h1>
          <Interests @update="getInterests($event)" />
          <div class="prev-submit">
            <button @click="prev()" class="next">Previous</button>
            <button @click="submit()" class="next">Submit</button>
          </div>
        </div>
        <div v-show="stage == 4" class="bio-screen">
          <h1>Finish your bio</h1>
          <textarea
            placeholder="Tell us about yourself!"
            rows="4"
            cols="50"
            max-length="200"
            v-model="bio"
          />
          <button @click="prev()" class="next">Previous</button>
          <button @click="submit()" class="next">Submit</button>
          <p>Max 200 characters.</p>
        </div>
      </div>
    </div>
    <p>You can always edit your profile later</p>
    <div class="navigators">
      <fa class="icon" @click="prev" icon="caret-left" />
      <fa class="icon" @click="next" icon="caret-right" />
    </div>
  </div>
</template>
<script>
import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";
import Interests from "../components/profile/Interests.vue";
import GenderSelect from "../components/profile/GenderSelect.vue";
export default {
  data() {
    return {
      stage: 1,
      name: "",
      gender: "none",
      phonenumber: "",
      age: "",
      occupation: "",
      interests: [],
      selectedInterests: 0,
      bio: "",
      submitted: [false, false, false, false],
      userId: -1,
      previousMatches: [],
    };
  },
  methods: {
    async makeProfile() {
      if (this.selectedInterests == 5) {
        //await dbService.makeProfile(this.getProfileData());
        await firestoreDB.addProfile(this.getProfileData());
        this.$router.push("/profile");
      } else {
        alert("Select 5 interests");
      }
    },
    getGender(e) {
      this.gender = e;
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
      profile.previousMatches = [];
      profile.userId = this.userId;
      console.log(profile);
      return profile;
    },
    next() {
      if (this.stage != 4) this.stage++;
    },
    prev() {
      if (this.stage != 1) this.stage--;
    },
    submit() {
      if (this.stage == 1) {
        if (!("" in [this.name, this.age, this.phonenumber, this.occupation])) {
          this.submitted[0] = true;
          this.stage++;
        } else {
          alert("Please input all fields");
        }
      } else if (this.stage == 2) {
        if ("none" !== this.gender) {
          this.submitted[1] = true;
          this.stage++;
        } else {
          alert("Please select a gender");
        }
      } else if (this.stage == 3) {
        if (this.selectedInterests == 5) {
          this.submitted[2] = true;
          this.stage++;
        } else {
          alert("Please select 5 interests");
        }
      } else {
        if ("" !== this.bio) {
          this.submitted[3] = true;
          if (false in this.submitted) {
            alert("Please complete your profile");
          } else {
            this.makeProfile();
          }
        } else {
          alert("Please enter your bio");
        }
      }
    },
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).user.id;
  },
  components: { Interests, GenderSelect },
};
</script>
<style scoped>
h1 {
  margin: 0.25em 0;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: max-content;
}
textarea {
  resize: none;
  padding: 0.5em;
  border: solid 1px #444;
  border-radius: 10px;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
}
.navigators {
  display: flex;
  position: fixed;
  top: 80%;
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
  margin: 1.5em 0;
  display: flex;
  flex-direction: column;
  outline: solid 1px #ddd;
  border-radius: 10px;
  background: #eee;
}

.interest-screen {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
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

.container {
  display: flex;
  place-content: center;
  width: fit-content;
  border-radius: 10px;
  border: solid 1px #444;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

button {
  border: none;
  border-radius: 10px;
  padding: 0.5em;
  color: white;
  background: #444;
  cursor: pointer;
  margin: 0.5em;
  font-weight: 600;
}

.stage {
  position: relative;
  width: 40%;
  display: flex;
  justify-content: space-around;
}

.stage button {
  background: #444;
  width: 30px;
  height: 30px;
}

.green {
  background: green !important;
}

.page {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
}

.prev-submit {
  display: flex;
}
</style>
