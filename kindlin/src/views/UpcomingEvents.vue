<template>
  <div>
    <h1>Upcomming Events</h1>
    <div v-for="event in myEvents" :key="event" class="events">
      <h2>{{ event.name }}</h2>
      <h3>{{ event.location }}</h3>
      <h3>{{ event.time }}</h3>
      <button @click="signUp(event.id)" class="signUp">signup</button>
    </div>
    <p>{{ secretMessage }}</p>
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
    async signUp(id) {
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await dbService.getProfile(user.id);
      let myEventIds = profile[0].myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile[0].id;
      myEventIds.push(id);
      profile[0].myEvents = myEventIds;
      await dbService.updateProfile(profile[0], profileId);

      //Hämta och joina ett event
      let event = await dbService.getEvent(id);
      let eventAttenders = event.eventUsers;
      eventAttenders.push(user.id);
      event.eventUsers = eventAttenders;
      await dbService.updateEvent(event, id);

      let updatedEvents = this.myEvents.filter((ids) => ids.id != id);
      this.myEvents = updatedEvents;
    },
  },
  async created() {
    let events = await dbService.getEvents(); //hämta events;
    console.log(events);
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await dbService.getProfile(user.id);
    let myEventIds = profile[0].myEvents; //My events Ids

    for (var currentEvent of events) {
      let currentEventID = currentEvent.id;
      if (!myEventIds.includes(currentEventID)) {
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
  },
};
</script>

<style scooped>
.events {
  border-style: solid;
  width: 70%;
  margin: auto;
  margin-top: 2em;
}
.sigUp {
  position: left;
}
</style>

<!-- Karen
{
      "name": "Karen",
      "gender": "Female",
      "phonenumber": 8273983492,
      "age": 22,
      "occupation": "Student",
      "bio": "Hej jag gillar pingis!",
      "userId": 7,
      "id": 9,
      "myEvents": [
        1
      ]
    },
-->
