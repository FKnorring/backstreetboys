<template>
  <BG />
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="page">
    <fa icon="fire" size="2x" color="#fa6d6b" />
    <h1>Upcoming Events</h1>
    <div v-if="this.myEvents.length === 0">
      <h2 class="empty"> No upcoming events at the moment </h2>
    </div>
    <div
      v-for="(event, i) in myEvents"
      :key="i"
      class="card"
      :class="{ open: openedEvent[i] }"
      @click="openEvent(i)"
    >
      <div class="simpleinfo">
        <h2>{{ event.name }}</h2>
        <button @click="signUp(event.id)" class="signUp">Sign up</button>
      </div>
      <div class="info" :class="{ show: openedEvent[i] }">
        <p>Location: {{ event.location }}</p>
        <h4>{{ convertTime(event.time) }}</h4>
      </div>
    </div>
    <p>{{ secretMessage }}</p>
  </div>
</template>

<script>
// import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";
import BG from "../components/BG.vue";
import Loader from "../components/Loader.vue"

export default {
  data() {
    return {
      myEvents: [],
      openedEvent: [],
      secretMessage: "",
      username: "",
      loaded: false,
    };
  },
  methods: {
    openEvent(i) {
      this.openedEvent[i] = !this.openedEvent[i];
    },
    convertTime(date) {
      let time = new Date(date);
      return (
        time.toDateString() + " \n" + time.getHours() + ":" + time.getMinutes()
      );
    },
    async signUp(id) {
      this.openedEvent = this.openedEvent.map(() => {
        return false;
      });
      this.myEvents = this.myEvents.filter((ids) => ids.id != id);
      let user = JSON.parse(localStorage.getItem("user")).user;
      //let profile = await dbService.getProfile(user.id);
      let profile = await firestoreDB.getProfile(user.id);
      //le  t event = await dbService.getEvent(id);
      let event = await firestoreDB.getEvent(id);
      let eventAttendersMale = event.eventUsersMale;
      let eventAttendersFemale = event.eventUsersFemale;

      if (profile.gender === "Male" && eventAttendersMale.length <= 10) {
        let myEventIds = profile.myEvents; //My Event Ids --> Lägg till id här.
        let profileId = profile.userId;
        myEventIds.push(id);
        profile.myEvents = myEventIds;
        //await dbService.updateProfile(profile, profileId);
        await firestoreDB.updateProfile(profileId, profile);

        //let event = await dbService.getEvent(id);
        let event = await firestoreDB.getEvent(id);
        let eventAttenders = event.eventUsersMale;
        eventAttenders.push(user.id);
        event.eventUsersMale = eventAttenders;
        //await dbService.updateEvent(event, id);
        await firestoreDB.updateEvent(id, event);
      } else if (
        profile.gender === "Female" &&
        eventAttendersFemale.length <= 10
      ) {
        let myEventIds = profile.myEvents; //My Event Ids --> Lägg till id här.
        let profileId = profile.userId;
        myEventIds.push(id);
        profile.myEvents = myEventIds;
        //await dbService.updateProfile(profile, profileId);
        await firestoreDB.updateProfile(profileId, profile);

        //let event = await dbService.getEvent(id);
        let event = await firestoreDB.getEvent(id);
        let eventAttenders = event.eventUsersFemale;
        eventAttenders.push(user.id);
        event.eventUsersFemale = eventAttenders;
        //await dbService.updateEvent(event, id);
        await firestoreDB.updateEvent(id, event);
      } else {
        console.log("Full array");
      }
    },
  },
  async created() {
    //let events = await dbService.getEvents(); //hämta events;
    let events = await firestoreDB.getEvents(); //hämta events;
    let user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = await dbService.getProfile(user.id);
    let profile = await firestoreDB.getProfile(user.id);
    let myEventIds = profile.myEvents; //My events Ids

    for (var currentEvent of events) {
      let currentEventID = currentEvent.id;

      if (
        !myEventIds.includes(currentEventID) &&
        currentEvent.eventHasStarted === false
      ) {
        let eventName = currentEvent.eventName;
        let eventLocation = currentEvent.eventLocation;
        let eventTime = currentEvent.eventTime;
        let eventInfo = {
          name: eventName,
          location: eventLocation,
          time: eventTime,
          id: currentEventID,
        };
        this.myEvents.push(eventInfo);
      }
    }
    this.myEvents.forEach(() => {
      this.openedEvent.push(false);
    });
    this.loaded = true;
  },
  components: { BG, Loader },
};
</script>

<style scoped>

.empty {
  color: #de9190;
  margin-top: 50px;
  font-weight: 1000;
  font: bold;
}
.card {
  display: flex;
  flex-direction: column;
  width: 65vw;
  padding: 20px 10vw;
  height: 40px;

  align-items: top;
  color: white;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 0, 0, 0.3);
  outline: outset 1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  cursor: pointer;
  background: #444;
  transition: height 0.5s ease;
}

.simpleinfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.card button {
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  height: 40px;
  font-weight: 500;
  color: #444;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  font-size: 1rem;
  cursor: crosshair;
}


.events {
  border-style: solid;
  width: 70%;
  margin: auto;
  margin-top: 2em;
}

.card h2 {
  font-size: 1rem;
  text-align: left;
  margin: 0;
  text-align: left;
  display: inline-block;
  height: 40px;
  width: 160px;
  line-height: 40px;
  overflow: hidden;
}

.page {
  margin-top:3.6rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.open {
  height: 120px;
}

.info {
  opacity: 0;
  transition: opacity 0.2s ease-out;
  font-size: 1rem;
  text-align: left;
  pointer-events: none;
  margin: 0;
}

h4 {
  margin: 0;
}

h1{
  margin-top:0.3rem;
}

.show {
  opacity: 100%;
  transition: opacity 0.4s ease-in;
}
</style>
