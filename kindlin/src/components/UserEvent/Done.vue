<template>
  <BG />
  <div class="offset"></div>
  <div v-if="this.hasSent">
    <h2>The event has finished!, who would you like to meet again?</h2>
    <div v-for="date in previousDates" :key="date" class="events">
      <div class="namepic">
        <h2>{{ date.name }}</h2>
        <img :src="picture(date)" alt="" />
      </div>
      <div class="check">
        <input id="boxID" type="checkbox" @click="updateMatch(date.userId)" />
        <p>Meet again</p>
      </div>
    </div>
    <div>
      <Button @click="sendMatches()" text="Send matches" color="#444" />
    </div>
  </div>
  <div v-else>
    <!-- När man skickat sina matches visas denna! -->
    <h1>Thanks for participating in the event!</h1>
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";
import Button from "../Button";
import BG from "../BG";
export default {
  name: "Done",
  data() {
    return {
      previousDates: [],
      matches: [],
      profile: {},
      hasSent: true,
    };
  },
  methods: {
    async getMatchProfile() {
      let stage = await firestoreDB.getStage();
      let event = await firestoreDB.getEvent(stage.event);
      let matchesList1 = event.eventMatches1;
      let matchesList2 = event.eventMatches2;
      let matchesList3 = event.eventMatches3;
      this.getMatchFromList(matchesList1);
      this.getMatchFromList(matchesList2);
      this.getMatchFromList(matchesList3);
    },
    getMatchFromList(matchesList) {
      for (const match of matchesList) {
        if (this.profile.gender === "Male") {
          if (match.matcher.userId === this.profile.userId) {
            this.previousDates.push(match.matchee);
          }
        } else if (match.matchee.userId === this.profile.userId) {
          this.previousDates.push(match.matcher);
        }
      }
    },
    updateMatch(id) {
      if (this.matches.includes(id)) {
        this.matches = this.matches.filter((ids) => ids != id);
      } else {
        this.matches.push(id);
      }
    },
    async sendMatches() {
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await firestoreDB.getProfile(user.id);
      profile.eventMatches = this.matches;
      await firestoreDB.updateProfile(user.id, profile);
      this.$router.push("/");
    },
    picture(date) {
      return (
        "https://randomuser.me/api/portraits/" +
        (date.gender == "Male" ? "men" : "women") +
        "/" +
        date.userId +
        ".jpg"
      );
    },
  },

  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    this.profile = await firestoreDB.getProfile(user.id);
    await this.getMatchProfile();
  },
  components: {
    Button,
    BG,
  },
};
</script>

<style scoped>
h2 {
  color: white;
  margin: 0;
  padding: 10px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.5);
}

input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.5);
}

input[type="checkbox"]:checked {
  background-color: #444;
}

.events {
  margin: 20px 0px;
  font-size: 15px;
}

img {
  border-radius: 100%;
  border: solid 1px black;
  width: 45px;
  margin-bottom: 1em;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.5);
}

.namepic {
  display: flex;
  justify-content: center;
  align-items: left;
}

.check {
  display: flex;
  justify-content: center;
  align-items: center;
}

.check p {
  font-weight: 900;
  margin: 0 10px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.5);
}

.offset {
  width: 100%;
  height: 90px;
}
</style>
