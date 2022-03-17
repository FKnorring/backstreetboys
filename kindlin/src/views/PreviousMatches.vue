<template>
  <BG />
  <Loader v-if="!loaded" />
  <div v-if="loaded" class="page">
    <fa icon="fire" size="2x" color="#fa6d6b" />
    <h1>Previous Matches</h1>
    <div v-if="matches.length === 0">
      <h2>You currently have no previous matches, go out and find THE one!</h2>
    </div>
    <div v-for="match in matches" :key="match" class="matches">
      <div class="infoPrevMatch">
        <h4>{{ match.name }}</h4>
        <h4>{{ match.number }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
// import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";
import BG from "../components/BG.vue";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      // userId: 1,
      matches: [],
      previous: [],
      loaded: false,
    };
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;

    let profile = await firestoreDB.getProfile(user.id);

    this.previous = profile.previousMatches;

    for (let i = 0; i < this.previous.length; i++) {
      let match = this.previous[i];
      console.log(this.previous[i]);
      let matchedProfile = await firestoreDB.getProfile(match);
      let matchedName = matchedProfile.name;
      let matchedNumber = matchedProfile.phonenumber;
      let matchedInfo = { name: matchedName, number: matchedNumber };
      this.matches.push(matchedInfo);
    }
    this.matches = [
      ...new Map(this.matches.map((item) => [item["id"], item])).values(),
    ];
    this.loaded = true;
  },
  components: { BG, Loader },
};
</script>

<style scoped>
.page {
  margin-top: 3.6rem;
}
.matches {
  width: 70%;
  margin: auto;
  margin-top: 2em;
  border-radius: 10px;
  background: #444;
  padding: 0 10px;
}

.infoPrevMatch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px;
  color: white;
}

h1 {
  margin-top: 0.3rem;
}

h3 {
  margin: 10px;
  justify-content: space-between;
}
</style>
