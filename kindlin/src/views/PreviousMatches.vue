<template>
  <h1>Previous Matches</h1>
  <div v-for="match in matches" :key="match" class="matches">
    <h2>{{ match.name }}</h2>
    <h3>{{ match.number }}</h3>
  </div>
</template>

<script>
import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";

export default {
  data() {
    return {
      userId: 1,
      matches: [],
    };
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = (await dbService.getProfile(user.id))[0];
    let profile = (await firestoreDB.getProfile(user.id))[0];
   // let matchIds = profile[0].matches;
    let previousMatches = profile.previousMatches;
    
    for(let i = 0; i < previousMatches.length; i++){
      let match = previousMatches[i];
      
      //let matchedProfile = await dbService.getProfile(match);
      let matchedProfile = await firestoreDB.getProfile(match);
      let matchedName = matchedProfile[0].name;
      let matchedNumber = matchedProfile[0].phonenumber;
      let matchedInfo = { name: matchedName, number: matchedNumber };
      this.matches.push(matchedInfo);
    }
  },
};
</script>

<style scoped>
.matches {
  border-style: solid;
  width: 70%;
  margin: auto;
  margin-top: 2em;
}
</style>
