<template>
  <div class="event-info"></div>
  <button @click="startEvent()">Start Event</button>
  <button @click="updateStage()" class="startRound">start round</button>
  <button @click="endEvent()" class="startRound">End Event</button>
  <div class="registered-users">
    <div class="user-container male">
      <h3>Registered Males</h3>
      <div class="start-event"></div>
      <div class="users">
        <div v-for="male in males" :key="male">
          <p>{{ male.name }}</p>
        </div>
      </div>
      <p>{{ males.length }}/10</p>
    </div>
    <div class="user-container female">
      <h3>Registered Females</h3>
      <div class="users">
        <div v-for="female in females" :key="female">
          <p>{{ female.name }}</p>
        </div>
      </div>
      <p>{{ females.length }}/10</p>
    </div>
  </div>
  <div class="matches">
    <button @click="match">Match</button>
    <button @click="randomMatch">randomize</button>
    <div class="user-container">
      <div class="users">
        <div class="match" v-for="match in matches" :key="match">
          <button  @click= "switchMatchMale(matcherId)" class="male">{{ match.matcher.name }}</button>
          <button  @click= "switchMatchFemale(matcheeId)" class ="female">{{ match.matchee.name }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dbService } from "../services/dbservice";
import { algorithm } from "../services/algorithm";

export default {
  data() {
    return {
      stage: {},
      event: {},
      males: [],
      females: [],
      matches: [],
      toSwitchMale: [null,null],
      toSwitchFemale: [null,null]
    };
  },
  methods: {
    async startEvent() {
      if (this.males.length != 10 || this.females.length != 10) {
        return;
      }

      let stage = await dbService.getStage();
      stage.started = "true";
      await dbService.updateStage(stage);

      let event = await dbService.getEvent(stage.event);
      event.eventHasStarted = true;
      await dbService.updateEvent(event, stage.event);
    },
    async getStage() {
      let stage = await dbService.getStage();
      return stage;
    },
    async getEvent() {
      return await dbService.getEvent(this.stage.event);
    },
    async getMales() {
      let eventUsersMale = this.event.eventUsersMale;
      let males = [];
      for (let i = 0; i < eventUsersMale.length; i++) {
        let male = await dbService.getProfile(eventUsersMale[i]);
        males.push(male[0]);
      }
      return males;
    },
    async getFemales() {
      let eventUsersFemale = this.event.eventUsersFemale;
      let females = [];
      for (let i = 0; i < eventUsersFemale.length; i++) {
        let female = await dbService.getProfile(eventUsersFemale[i]);
        females.push(female[0]);
      }
      return females;
    },
    async endEvent() {
      let stage = await dbService.getStage();
      stage.event = -1;
      stage.started = "false";
      stage.stage = 0;
      stage.state = "waiting";
      await dbService.updateStage(stage);
      this.$router.push("/organizer");
    },
    async updateStage() {
      let stage = await dbService.getStage();
      if (stage.stage < 3) {
        stage.stage = stage.stage + 1;
        console.log(stage.stage);
        await dbService.updateStage(stage);
      }
    },
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

    switchMatchesMale(toggle){
        console.log(toggle);
        if (this.switchMatchesMale.length > 2){
            return
        } 

        if (this.switchMatchesMale[0] == toggle){
            this.switchMatchesMale = null;
        }
        else if (this.this.switchMatchesMale[1] == toggle){
            this.switchMatchesMale = null;
        }

        else if (this.switchMatchesMale[0] == null){
            this.switchMatchesMale[0] == toggle;
        }

        else if (this.switchMatchesMale[1] == null){
            this.switchMatchesMale[1] == toggle;
        }
    },



    sendMatches() {
      this.matches.forEach((match) => {
        let matcherId = match.matcher.userId;
        let matcheeId = match.matchee.userId;
        if (match.matcher.currentMatches) {
          match.matcher.currentMatches.push(matcheeId);
        } else {
          match.matcher.currentMatches = [matcheeId];
        }
        if (match.matchee.currentMatches) {
          match.matchee.currentMatches.push(matcherId);
        } else {
          match.matchee.currentMatches = [matcherId];
        }
        dbService.updateProfile(match.matcher, matcherId);
        dbService.updateProfile(match.matchee, matcheeId);
      });
    },
  },
  async created() {
    this.stage = await this.getStage();
    if (this.stage.event > 0) {
      this.event = await this.getEvent();
      console.log("hej");
      this.males = await this.getMales();
      this.females = await this.getFemales();
      this.matches = this.randomMatch();
      window.setInterval(async () => {
        this.stage = await this.getStage();
        if (this.stage.event > 0) {
          this.event = await this.getEvent();
          this.males = await this.getMales();
          this.females = await this.getFemales();
        }
      }, 100000);
    }
  },
};
</script>
<style scoped>
.registered-users {
  display: flex;
}

.matches {
  width: 50%;
}

.user-container {
  margin: 0.1em;
  border: solid 1px #444;
  border-radius: 10px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.users {
  width: 100%;
  height: 250px;
  outline: solid 1px black;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
  overflow-y: scroll;
  overflow-x: hidden;
}

.match {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.users p {
  margin: 0;
  padding: 0.25em;
}

.female p {
  color: red;
}

.male p {
  color: blue;
}

.match p {
  text-align: center;
}
</style>
