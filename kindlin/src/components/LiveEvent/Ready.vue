<template>
    <div class="matches">
        <button @click="match">Match</button>
        <button @click="randomMatch">randomize</button>
        <button @click="updateState()" class="state"> Make people talk:)</button>
        <div class="user-container">
        <div class="users">
        <div class="match" v-for="match in matches" :key="match">
          <p class="male">{{ match.matcher.name }}</p>
          <p class="female">{{ match.matchee.name }}</p>
        </div>
        </div>
        </div>
  </div>
</template>


<script>
import { dbService } from "../../services/dbservice";
//import { algorithm } from "../services/algorithm";
export default {
    name: "Ready",
    methods: {
        async updateState(){
            let stage = await dbService.getStage();
            stage.state = "dating";
            await dbService.updateStage(stage);
            }
        }
}
</script>
<!--
    methods: {
        match() {
        if (this.males.length < 10 || this.females.length < 10) {
        return;
      }
      let profiles = [...this.males, ...this.females];
      this.matches = algorithm.getMatches(profiles);
    },
    shuffle(list) {
      let array = [...list];
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    randomMatch() {
      let males = this.shuffle(this.males);
      let females = this.shuffle(this.females);
      let matches = [];
      for (let i = 0; i < males.length; i++) {
        matches.push({ matcher: males[i], matchee: females[i] });
      }
      this.matches = matches;
    },
    }
}

</script>

<style scoped>
.match {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

</style>

-->