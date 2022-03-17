<template>
  <BG />
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="dating-screen">
    <h1>Round: {{ this.stage.stage }}</h1>
    <h2>Your next Match</h2>
    <Profile :user="match" />
  </div>
</template>

<script>
import BG from "../BG";
import { firestoreDB } from "../../services/db";
import Profile from "../../components/profile/Profile.vue";
import Loader from "../Loader.vue"

export default {
  name: "dating",
  data() {
    return {
      stage: {},
      page: "wait",
      value1: 4,
      value2: 4,
      value3: 4,
      profile: {},
      match: {},
      loaded: false,
    };
  },
  methods: {
    async updateWeights() {
      this.profile.weights = this.newWeights;
      await firestoreDB.updateProfile(this.profile.id, this.profile);
    },
    incrStage() {
      console.log(this.stage);
      let stage = { event: 10, started: false, stage: 3, state: "waiting" };
      firestoreDB.setStage(stage);
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
    let match = await this.getMatchProfile();
    this.match = match;
    this.loaded = true;

    /*onSnapshot(doc(firestoreDB.db, "stage/stage"), async (doc) => {
      this.stage = doc.data();
      this.match = await firestoreDB.getProfile(
        this.profile.currentMatches[this.stage.stage]
      );
    });*/
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
  components: { Profile, BG, Loader },
};
</script>

<style scoped>
.dating-screen {
  padding-top: 1em;
}

.waiting-screen {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
}
.map {
  font-size: 5rem;
  margin-bottom: 2rem;
  cursor: pointer;
}

.user {
  font-size: 5rem;
  margin-bottom: 2rem;
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

h1 {
  margin: 0;
}
</style>
