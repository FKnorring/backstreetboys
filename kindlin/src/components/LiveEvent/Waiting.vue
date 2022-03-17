<template>
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="page">
    <div class="event-info"></div>
    <div class="buttons">
      <Button @click="openEvent()" color="DarkSlateGray" text="Open event" />
      <Button @click="startEvent()" color="darkgreen" text="Start event" />
      <Button @click="endEvent()" text="End event" color="red" />
    </div>
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
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";
import { doc, onSnapshot } from "firebase/firestore";
import Button from "../Button";
import Loader from "../Loader.vue"

export default {
  name: "Waiting",
  data() {
    return {
      stage: null,
      event: {},
      males: [],
      females: [],
      loaded: false,
    };
  },
  components: {
    Button, Loader
  },
  methods: {
    async openEvent() {
      this.stage.started = true;
      let event = await firestoreDB.getEvent(this.stage.event);
      event.eventHasStarted = true;
      await firestoreDB.updateEvent(this.stage.event, event);
      await firestoreDB.setStage(this.stage);
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
      this.stage.event = -1;
      this.stage.started = "false";
      this.stage.stage = 0;
      this.stage.state = "waiting";
      await firestoreDB.setStage(this.stage);
      this.$router.push("/organizer");
      this.event.eventHasStarted = false;
      await firestoreDB.updateEvent(this.event.id, this.event);
    },
    async startEvent() {
      if (
        this.stage.started === false ||
        this.females.length != 10 ||
        this.males.length != 10
      ) {
        return;
      }
      this.stage.state = "ready";
      this.stage.stage = 1;
      await firestoreDB.setStage(this.stage);
    },
  },

  async created() {
    this.stage = await this.getStage();
    this.event = await this.getEvent();
    this.males = await this.getMales();
    this.females = await this.getFemales();
    this.loaded = true;
    onSnapshot(doc(firestoreDB.db, "events/" + this.stage.event), (doc) => {
      this.event = doc.data();
    });
  },
};
</script>
<style scoped>
.page{
  margin-top:5rem;
}

.registered-users {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 35%;
  padding: 50px;
}

.matches {
  width: 50%;
}

.buttons {
  padding: 10px;
}

.user-container {
  margin: 0.1em;
  border: solid 1px #444;
  background:#444;
  border-radius: 10px;
  padding: 2em;
  width: 35%;
  height: 100%;
  min-height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}

.users {
  width: 100%;
  background: #444;
  height: fit-content;
  border-radius: 10px;
  outline: solid 1px black;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.match {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.users p {
  background: rgb(51, 51, 51);
  margin: 0;
  padding: 0.25em;
}

.female p {
  color: white;
}

.male p {
  color: white;
}

.match p {
  text-align: center;
}

h3 {
  color: white;
  margin-bottom: 20px;
}
</style>
