<template>
  <BG />
  <div v-if="!finishedReview" class="review-screen">
    <h1>Review</h1>
    <div class="sliders">
      <h3>How well did the conversation go?</h3>
      <input type="range" min="1" max="7" step="1" v-model="value1" />
      {{ value1 }}
      <h3>How well did your interests match?</h3>
      <input type="range" min="1" max="7" step="1" v-model="value2" />
      {{ value2 }}
      <h3>How positive was your impression?</h3>
      <input type="range" min="1" max="7" step="1" v-model="value3" />
      {{ value3 }}
    </div>
    <Button @click="updateWeights" text="Submit review" color="green" />
  </div>
  <div v-if="finishedReview" class="finishedReview">
    <h2>Waiting for all reviews!</h2>
    <Button class="goBack" @click="goBack()" text="Go back" color="teal" />
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";
import Button from "../Button";
import BG from "../BG.vue";
export default {
  name: "review",
  data() {
    return {
      value1: 4,
      value2: 4,
      value3: 4,
      profile: {},
      match: {},
      stage: {},
      finishedReview: false,
    };
  },
  components: {
    Button, BG
  },
  methods: {
    async goBack() {
      this.finishedReview = false;
    },
    async updateWeights() {
      this.finishedReview = true;
      this.profile.weights = this.newWeights;
      await firestoreDB.updateProfile(this.profile.userId, this.profile);
    },
    async getMatchProfile() {
      let event = await firestoreDB.getEvent(this.stage.event);
      let matchesList = null;
      if (this.stage.stage === 1) {
        matchesList = event.eventMatches1;
      } else if (this.stage.stage === 2) {
        matchesList = event.eventMatches2;
      } else if (this.stage.stage === 3) {
        matchesList = event.eventMatches3;
      }
      for (const match of matchesList) {
        if (this.profile.gender === "Male") {
          if (match.matcher.userId === this.profile.userId) {
            console.log("XDMALE");
            return match.matchee;
          }
        } else if (match.matchee.userId === this.profile.userId) {
          console.log("XDFEMALE");
          return match.matcher;
        }
      }
    },
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    this.profile = await firestoreDB.getProfile(user.id);
    this.stage = await firestoreDB.getStage();
    this.match = await this.getMatchProfile();
  },
  computed: {
    newWeight: function () {
      return (
        Math.round(
          ((parseInt(this.value1) +
            parseInt(this.value2) +
            parseInt(this.value3)) /
            12 -
            0.75) *
            100
        ) / 100
      );
    },
    multWeight: function () {
      let matchWeight = this.match.interests;
      if (matchWeight) {
        matchWeight.map((interest) => {
          return interest ? 1 : 0;
        });
        return matchWeight.map((weight) => {
          console.log(weight * this.newWeight);
          return weight * this.newWeight;
        });
      } else {
        return null;
      }
    },
    newWeights: function () {
      if (this.profile.weights) {
        return this.profile.weights.map((weight, index) => {
          return (weight += this.multWeight[index]);
        });
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
h3 {
  color: white;
}

.review-screen {
  display: grid;
  place-items: center;
  padding-top: 5em;
}

.sliders {
  display: flex;
  position: relative;
  flex-direction: column;
  place-content: center;
  margin: 30px;
  width: 330px;
}

.finishedReview h2{
  margin: 0;
  padding: 100px;
}
</style>
