<template>
  <div>
    <h1>My events</h1>
    <div class="scrollbox">
      <div v-for="event in myEvents" :key="event" class="events">
        <h2>{{ event.name }}</h2>
        <h3>{{ event.location }}</h3>
        <h3>{{ event.time }}</h3>
        <button
          @click="joinEvent(event)"
          class="joinButton"
          :class="{ active: event.hasStarted }"
        >
          Go to event
        </button>
        <button @click="leaveEvent(event.id)" class="leaveButton">
          Leave event
        </button>
      </div>
      <p>{{ secretMessage }}</p>
    </div>
  </div>
</template>

<script>
import { dbService } from "../services/dbservice";
export default {
  data() {
    return {
      myEvents: [],
      secretMessage: "",
      username: "",
    };
  },
  methods: {
    async leaveEvent(id) {
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await dbService.getProfile(user.id);
      let myEventIds = profile[0].myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile[0].id;

      let updatedIds = myEventIds.filter((ids) => ids != id);
      profile[0].myEvents = updatedIds;
      console.log(profile[0]);
      await dbService.updateProfile(profile[0], profileId);

      // Hämta och lämna eventet i event databasen
      if (profile[0].gender === "Male") {
        let event = await dbService.getEvent(id);
        let eventUsers = event.eventUsersMale;
        let updatedEventUsers = eventUsers.filter((ids) => ids != user.id);
        event.eventUsersMale = updatedEventUsers;
        let updatedActiverUsers = event.activeUsersMale.filter(
          (ids) => ids != user.id
        );
        event.activeUsersMale = updatedActiverUsers;
        await dbService.updateEvent(event, id);
      } else {
        // Female
        let event = await dbService.getEvent(id);
        let eventUsers = event.eventUsersFemale;
        let updatedEventUsers = eventUsers.filter((ids) => ids != user.id);
        event.eventUsersFemale = updatedEventUsers;
        let updatedActiverUsers = event.activeUsersFemale.filter(
          (ids) => ids != user.id
        );
        event.activeUsersFemale = updatedActiverUsers;
        await dbService.updateEvent(event, id);
      }
      //
      let updatedMyEvents = this.myEvents.filter((ids) => ids.id != id);
      this.myEvents = updatedMyEvents;
    },
    async joinEvent(currentEvent) {
      if (!currentEvent.hasStarted) return;
      let id = currentEvent.id;

      let event = await dbService.getEvent(id);
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await dbService.getProfile(user.id);

      if (profile[0].gender === "Male") {
        let updatedUsers = event.activeUsersMale;
        if (!updatedUsers.includes(user.id)) {
          updatedUsers.push(user.id);
          event.activeUsersMale = updatedUsers;
          await dbService.updateEvent(event, id);

          //Uppdater en bool (Ändrar knappen)
        }
      } else {
        let updatedUsers = event.activeUsersFemale;
        if (!updatedUsers.includes(user.id)) {
          updatedUsers.push(user.id);
          event.activeUsersFemale = updatedUsers;
          await dbService.updateEvent(event, id);
          console.log("Fanns ej");
        }
      }
      //Skicka till live event
      this.$router.push("/EventStage");
    },
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await dbService.getProfile(user.id);
    let eventIds = profile[0].myEvents;

    for (var currentEvent of eventIds) {
      let event = await dbService.getEvent(currentEvent);
      let eventHasStarted = event.eventHasStarted;
      let eventName = event.eventName;
      let eventLocation = event.eventLocation;
      let eventTime = Date(event.eventTime).toString();
      let eventId = event.id;
      let eventInfo = {
        name: eventName,
        location: eventLocation,
        time: eventTime,
        id: eventId,
        hasStarted: eventHasStarted,
      };
      this.myEvents.push(eventInfo);
    }
  },
};
</script>

<style scoped>
.events {
  border-style: solid;
  width: 70%;
  margin: auto;
  margin-top: 2em;
}

.scrollbox {
  overflow: scroll;
}

.joinButton {
  cursor: default;
  background: gray;
}

.active {
  cursor: pointer;
  background: green;
}
</style>
