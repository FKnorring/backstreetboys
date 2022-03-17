<template>
  <div class="matches">
    <Button @click="updateState()" text="People talk" class="state" />
    <Button
      @click="endEvent()"
      class="state"
      color="darkgreen"
      text="End event"
    />
    <Button @click="match" color="#fa6d6b" text="Match" />

    <Button @click="randomMatch" color="teal" text="Random match" />
    <div v-if="matchBool">
      <h3>No matches made</h3>
    </div>
    <div v-if="!matchBool" class="user-container">
      <div class="users">
        <div class="match" v-for="(match, i) in matches" :key="match">
          <button
            v-bind:class="clicked ? 'teal' : 'blue'"
            @click="switchMatchMale(i)"
            class="male"
          >
            <div class="username">{{ match.matcher.name }}</div>
          </button>
          <button @click="switchMatchFemale(i)" class="female">
            <div class="username">{{ match.matchee.name }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { algorithm } from "../../services/algorithm";
import { firestoreDB } from "../../services/db";
import { doc, onSnapshot } from "firebase/firestore";
import Button from "../Button";

export default {
  data() {
    return {
      stage: null,
      event: {},
      males: [],
      females: [],
      matches: [],
      toSwitchMale: [-1, -1],
      toSwitchFemale: [-1, -1],
      matchBool: true,
    };
  },
  components: {
    Button,
  },
  methods: {
    async updateState() {
      if (this.matches.length === 0) {
        //Kan inte gå vidare om det inte finns matches
        return;
      }
      let stage = await firestoreDB.getStage();
      let event = await firestoreDB.getEvent(stage.event);
      if (stage.stage === 1) {
        event.eventMatches1 = this.matches;
      } else if (stage.stage === 2) {
        event.eventMatches2 = this.matches;
      } else if (stage.stage === 3) {
        event.eventMatches3 = this.matches;
      } else {
        console.log("Error, stage not in sync");
      }
      await firestoreDB.updateEvent(stage.event, event);
      stage.state = "dating";
      await firestoreDB.setStage(stage);
      console.log("Updated matches");
    },
    async getStage() {
      let stage = await firestoreDB.getStage();
      return stage;
    },
    async getEvent() {
      return await firestoreDB.getEvent(this.stage.event);
    },
    async getMales() {
      let eventUsersMale = this.event.eventUsersMale;
      let males = [];
      for (let i = 0; i < eventUsersMale.length; i++) {
        let male = await firestoreDB.getProfile(eventUsersMale[i]);
        males.push(male);
      }
      return males;
    },
    async getFemales() {
      let eventUsersFemale = this.event.eventUsersFemale;
      let females = [];
      for (let i = 0; i < eventUsersFemale.length; i++) {
        let female = await firestoreDB.getProfile(eventUsersFemale[i]);
        females.push(female);
      }
      return females;
    },
    async endEvent() {
      let stage = await firestoreDB.getStage();
      let event = await firestoreDB.getEvent(stage.event);
      event.eventHasStarted = false;
      stage.event = -1;
      stage.started = "false";
      stage.stage = 0;
      stage.state = "waiting";
      await firestoreDB.updateEvent(stage.event, event);
      await firestoreDB.setStage(stage);
      this.$router.push("/organizer");
    },
    async setStage() {
      let stage = this.stage;
      if (stage.stage < 3) {
        stage.stage = stage.stage + 1;
        await firestoreDB.setStage(stage);
      }
    },

    switchMatchMale(toggle) {
      let zero = this.toSwitchMale[0];
      let one = this.toSwitchMale[1];

      if (zero == toggle) {
        this.toSwitchMale[0] = -1;
      } else if (one == toggle) {
        this.toSwitchMale[1] = -1;
      } else if (zero == -1) {
        this.toSwitchMale[0] = toggle;
      } else if (one == -1) {
        this.toSwitchMale[1] = toggle;
      }
      let noll = this.toSwitchMale[0];
      let ett = this.toSwitchMale[1];
      console.log(noll, ett);
      if (noll > -1 && ett > -1) {
        console.log("DAGS FoR BYTE");
        let tempMale = this.matches[noll].matcher;
        this.matches[noll].matcher = this.matches[ett].matcher;
        this.matches[ett].matcher = tempMale;
        this.toSwitchMale[0] = -1;
        this.toSwitchMale[1] = -1;
      }
    },

    switchMatchFemale(toggle) {
      let zero = this.toSwitchFemale[0];
      let one = this.toSwitchFemale[1];
      if (zero == toggle) {
        this.toSwitchFemale[0] = -1;
      } else if (one == toggle) {
        this.toSwitchFemale[1] = -1;
      } else if (zero == -1) {
        this.toSwitchFemale[0] = toggle;
      } else if (one == -1) {
        this.toSwitchFemale[1] = toggle;
      }
      let noll = this.toSwitchFemale[0];
      let ett = this.toSwitchFemale[1];
      console.log(noll, ett);
      if (noll > -1 && ett > -1) {
        console.log("DAGS FoR BYTE");
        let tempFemale = this.matches[noll].matchee;
        this.matches[noll].matchee = this.matches[ett].matchee;
        this.matches[ett].matchee = tempFemale;
        this.toSwitchFemale[0] = -1;
        this.toSwitchFemale[1] = -1;
        //console.log(this.matches[noll])
        //console.log(this.matches[ett])
      }
    },

    match() {
      this.matchBool = false;
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
      this.matchBool = false;
      let males = this.shuffle(this.males);
      let females = this.shuffle(this.females);
      let matches = [];
      for (let i = 0; i < males.length; i++) {
        matches.push({ matcher: males[i], matchee: females[i] });
      }
      this.matches = matches;
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
        firestoreDB.updateProfile(match.matcher, matcherId);
        firestoreDB.updateProfile(match.matchee, matcheeId);
      });
    },
  },
  async created() {
    this.stage = await this.getStage();
    this.event = await this.getEvent();
    this.males = await this.getMales();
    this.females = await this.getFemales();
    //this.matches = this.randomMatch();

    onSnapshot(doc(firestoreDB.db, "stage/stage"), (doc) => {
      this.stage = doc.data();
    });
    onSnapshot(doc(firestoreDB.db, "events/" + this.stage.event), (doc) => {
      this.event = doc.data();
    });
  },
};
</script>
<style scoped>
.registered-users {
}

.matches {
  margin: auto;
  width: 50%;
  padding: 10px;
  font-size: 20px;
 
  
}

.user-container {

  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}

.users {
  padding: 5px;
  width: 100%;
  height: 100%;
  font-size: 1.3em;
  outline: solid 1px black;
  border-radius: 10px;
  font-size: 150%;
  background: rgba(0, 0, 0, 0.05);
}

.match {
  justify-content: space-between;
  align-items: center;
  
}

.users p {
  margin: 10px;
  font-size: 150%;
  margin: 0;
}

.female p {
  color: red;
}

.male {
  background: darkslategray;
  text-align: center;
  color: white;
  border: 1% solid black;
  border-radius: 8px;
  width: 12rem;
  padding: 0.01em;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-bottom: 0.3em;
  margin-right:17px;
}

.male:active {
   background: teal;
}

.male:focus {
   background: teal;
  
}
.female {
  color: white;
  background: DarkSlateGray;

  text-align: center;
  border: 1% solid black;
  border-radius: 8px;
  width: 12rem;
  padding: 0.01em;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-bottom: 0.3em;
}

.female:active {
  background: teal;
  text-align: center;
  border: 1% solid black;
  border-radius: 8px;
  width: 12rem;
  padding: 0.01em;
}

.female:focus {
  background: teal;
  text-align: center;
  border: 1% solid black;
  border-radius: 8px;
  width: 12rem;
  padding: 0.01em;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-bottom: 0.3em;
}
.male p {
  color: blue;
}

.match p {
  text-align: center;
}

.username {
  font-size: 1.2rem;
  font-weight: 300;
  margin: 10px;
}
</style>
