<template>
  <h1>{{ stage }}</h1>
  <button @click="incrStage()"></button>
  <div v-show="page === 'wait'" class="waiting-screen">
    <fa @click="page = 'map'" class="map" icon="map" />
    <fa @click="page = 'match'" class="user" icon="user" />
  </div>
  <div v-show="page === 'map'" class="map-screen">
    <fa class="icon" @click="page = 'wait'" icon="caret-left" />
    <h1>map</h1>
  </div>
  <div v-show="page === 'match'" class="match-screen">
    <fa class="icon" @click="page = 'wait'" icon="caret-left" />
    <h1>Match</h1>
    {{ profile }}
  </div>
  <div v-show="page === 'review'" class="review-screen">
    <h1>Review</h1>
    <div class="sliders">
      {{ value1 }}
      <input type="range" min="1" max="7" step="1" v-model="value1" />
      {{ value2 }}
      <input type="range" min="1" max="7" step="1" v-model="value2" />
      {{ value3 }}
      <input type="range" min="1" max="7" step="1" v-model="value3" />
    </div>
    <button @click="updateWeights">Ready</button>
  </div>
</template>

<script>
import { dbService } from "../services/dbservice";

export default {
  data() {
    return {
      matchId: "",
      stage: {},
      page: "review",
      value1: 4,
      value2: 4,
      value3: 4,
      match: {},
      profile: {},
    };
  },
  methods: {
    async updateWeights() {
      this.profile.weights = this.newWeights;
      await dbService.updateProfile(this.profile, this.profile.id);
    },
    incrStage() {
      console.log(this.stage);
      let stage = { started: false, stage: 3, state: "waiting" };
      dbService.updateStage(stage);
    },
  },
  async created() {
    this.match = (await dbService.getProfile(8))[0];
    let user = JSON.parse(localStorage.getItem("user")).user;
    this.profile = (await dbService.getProfile(user.id))[0];
    this.stage = await dbService.getStage();
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
  watch: {
    stage: async function () {
      let stage = await dbService.getStage();
      console.log(stage);
      return stage;
    },
  },
};
</script>

<style scoped>
.waiting-screen {
  display: flex;
  flex-direction: column;
}
.map {
  font-size: 5rem;
  margin: 2rem;
  cursor: pointer;
}

.user {
  font-size: 5rem;
  margin: 2rem;
  cursor: pointer;
}

.review-screen {
  display: grid;
  place-items: center;
}

.sliders {
  display: flex;
  position: relative;
  flex-direction: column;
  place-content: center;
  width: 350px;
}
</style>
