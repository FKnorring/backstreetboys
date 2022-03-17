<template>
  <Loader v-if="!loaded"></Loader>
  <div v-if="loaded" class="background">
    <h1>All events</h1>
    <Button
      class="addEvent"
      @toggle-add-event="toggleAddEvent()"
      text="Add event"
      color="green"
    />
    <div class="container">
      <div v-show="showAddEvent">
        <AddEvent @add-event="addEvent" />
      </div>
      <Events @delete-event="deleteEvent" class="eventorg" :events="events" />
    </div>
  </div>
</template>

<script>
import { firestoreDB } from "../services/db";
import Events from "../components/Events";
import Button from "../components/Button";
import AddEvent from "../components/AddEvent";
import Loader from "../components/Loader.vue"

export default {
  name: "Organizer",
  components: {
    Events,
    Button,
    AddEvent,
    Loader
  },
  data() {
    return {
      showAddEvent: false,
      events: [],
      users: [],
      userId: -1,
      profile: {},
      loaded: false,
    };
  },
  methods: {
    toggleAddEvent() {
      firestoreDB.getNextEventId();
      this.showAddEvent = !this.showAddEvent;
    },
    async addEvent(event) {
      this.events = [...this.events, event];
      event.id = await firestoreDB.getNextEventId();
      firestoreDB.addEvent(event);
    },
    deleteEvent(id) {
      if (confirm("Are you sure?")) {
        this.events = this.events.filter((event) => event.id !== id);
        firestoreDB.removeEvent(id);
      }
    },
    async showUser(id) {
      if (this.userId === id) {
        return (this.userId = -1);
      }
      const profile = await firestoreDB.getProfile(id);
      this.profile = profile[0];
      this.userId = id;
    },
  },

  async created() {
    this.events = await firestoreDB.getEvents(); //hämta events;
    this.loaded = true;
  },
};
</script>

<style>
.container {
  max-width: 750px;
  margin: 25px auto;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 250px;
  background: #444;
  /*border: 1px solid lightgray;*/
  padding: 25px;
  border-radius: 25px;
  height: 60%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 0, 0, 0.3);
}

.background {
  background-image: url("../assets/tomas.jpg");
  background-size: cover;
  position: absolute;
  z-index: -10;
  height: 100%;
  width: 100%;
}

.btn {
  display: inline-block;
  background: green;

  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.eventorg {
  border: none;
  outline: none;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 0, 0, 0.3);
}

.header {
  align-content: row;
}

.addEvent {
  float: center;
}
</style>
