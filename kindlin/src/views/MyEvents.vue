<template>
  <BG />
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="page">
    <fa icon="fire" size="2x" color="#fa6d6b" />
    <h1>My events</h1>
    <div class="scrollbox">
      <div
        @click="openEvent(i)"
        v-for="(event, i) in myEvents"
        :key="event"
        class="card"
        :class="{ open: openedEvent[i] }"
      >
        <div class="simpleinfo">
          <h2>{{ event.name }}</h2>
          <button
            @click="joinEvent(event)"
            :class="{ active: event.hasStarted }"
            class="join"
          >
            Join
          </button>
          <button @click="leaveEvent(event.id)" class="leave">Leave</button>
        </div>
        <div class="info" :class="{ show: openedEvent[i] }">
          <p>Location: {{ event.location }}</p>
          <h4>{{ convertTime(event.time) }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestoreDB } from "../services/db";
import BG from "../components/BG.vue";
import Loader from "../components/Loader.vue"

export default {
  data() {
    return {
      myEvents: [],
      openedEvent: [],
      events: [],
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
    async leaveEvent(id) {
      this.openedEvent = this.openedEvent.map(() => {
        return false;
      });
      this.myEvents = this.myEvents.filter((ids) => ids.id != id);
      let user = JSON.parse(localStorage.getItem("user")).user;
      //let profile = await dbService.getProfile(user.id);
      let profile = await firestoreDB.getProfile(user.id);
      let myEventIds = profile.myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile.userId;

      let updatedIds = myEventIds.filter((ids) => ids != id);
      profile.myEvents = updatedIds;
      console.log(profile);
      //await dbService.updateProfile(profile, profileId);

      await firestoreDB.updateProfile(profileId, profile);

      // Hämta och lämna eventet i event databasen
      if (profile.gender === "Male") {
        //let event = await dbService.getEvent(id);

        let event = await firestoreDB.getEvent(id);

        let eventUsers = event.eventUsersMale;
        let updatedEventUsers = eventUsers.filter((ids) => ids != user.id);
        event.eventUsersMale = updatedEventUsers;
        let updatedActiverUsers = event.activeUsersMale.filter(
          (ids) => ids != user.id
        );
        event.activeUsersMale = updatedActiverUsers;
        await firestoreDB.updateEvent(id, event);
        //await dbService.updateEvent(event, id);
      } else {
        // Female
        // let event = await dbService.getEvent(id);
        let event = await firestoreDB.getEvent(id);
        let eventUsers = event.eventUsersFemale;
        let updatedEventUsers = eventUsers.filter((ids) => ids != user.id);
        event.eventUsersFemale = updatedEventUsers;
        let updatedActiverUsers = event.activeUsersFemale.filter(
          (ids) => ids != user.id
        );
        event.activeUsersFemale = updatedActiverUsers;
        //await dbService.updateEvent(event, id);
        console.log(event);
        await firestoreDB.updateEvent(id, event);
      }
    },
    async joinEvent(currentEvent) {
      if (!currentEvent.hasStarted) return;
      let id = currentEvent.id;

      //let event = await dbService.getEvent(id);
      let event = await firestoreDB.getEvent(id);
      let user = JSON.parse(localStorage.getItem("user")).user;
      //let profile = await dbService.getProfile(user.id);
      let profile = await firestoreDB.getProfile(user.id);

      if (profile.gender === "Male") {
        let updatedUsers = event.activeUsersMale;
        if (!updatedUsers.includes(user.id)) {
          updatedUsers.push(user.id);
          event.activeUsersMale = updatedUsers;
          //await dbService.updateEvent(event, id);
          await firestoreDB.updateEvent(id, event);

          //Uppdater en bool (Ändrar knappen)
        }
      } else {
        let updatedUsers = event.activeUsersFemale;
        if (!updatedUsers.includes(user.id)) {
          updatedUsers.push(user.id);
          event.activeUsersFemale = updatedUsers;
          //await dbService.updateEvent(event, id);
          await firestoreDB.updateEvent(id, event);

          console.log("Fanns ej");
        }
      }
      //Skicka till live event
      this.$router.push("/EventStage");
    },
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = await dbService.getProfile(user.id);
    let profile = await firestoreDB.getProfile(user.id);
    this.username = profile.name;
    let eventIds = profile.myEvents;

    for (var currentEvent of eventIds) {
      //let event = await dbService.getEvent(currentEvent);
      let event = await firestoreDB.getEvent(currentEvent);
      let eventHasStarted = event.eventHasStarted;
      let eventName = event.eventName;
      let eventLocation = event.eventLocation;
      let eventTime = event.eventTime;
      let eventId = event.id;
      let eventInfo = {
        name: eventName,
        location: eventLocation,
        time: eventTime,
        id: eventId,
        hasStarted: eventHasStarted,
      };
      this.myEvents.push(eventInfo);
      this.openedEvent.push(false);
      this.loaded = true;
    }
  },
  components: { BG, Loader },
};
</script>

<style scoped>
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

.card button {
  border-radius: 10px;
  border: none;
  padding: 0 10px;
  height: 35px;
  font-weight: 500;
  color: #444;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  font-size: 0.7rem;
  cursor: crosshair;
  margin: 2px;
}

.events {
  border: none;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0;
  margin: 0;
  cursor: pointer;
  height: min-content;
  background: #e2b37d;
  transition: height 0.5s ease;
}

.scrollbox {
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 650px;
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

.open {
  height: 120px;
}

.joinButton {
  cursor: default;
  background: gray;
}

.active {
  cursor: pointer;
  background: green;
}
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:3.6rem;
}

.simpleinfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
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

.show {
  opacity: 100%;
  transition: opacity 0.4s ease-in;
}

.join {
  background: gray;
  color: white !important;
}

.active {
  background: darkgreen !important;
  color: white !important;
}

.leave {
  background: darkred;
  color: white !important;
}

h1{
  margin-top:0.3rem;
}
</style>
