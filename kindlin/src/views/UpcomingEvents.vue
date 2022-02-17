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
import { userService } from "../services/userService";
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
      let profile = await userService.getProfile(user.id);
      let myEventIds = profile[0].myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile[0].id;
      myEventIds.push(id);
      profile[0].myEvents = myEventIds;
      await userService.updateProfile(profile[0], profileId);
      
      //Hämta och joina ett event
      let event = await userService.getEvent(id);
      let eventAttenders = event[0].eventUsers;
      eventAttenders.push(user.id);
      event[0].eventUsers = eventAttenders;
      console.log(event[0]);
      await userService.updateEvent(event[0], id);

      let updatedEvents = this.myEvents.filter(ids => ids.id != id);
      this.myEvents = updatedEvents;
    },
  },
  async created() {
    let events = await userService.getEvents(); //hämta events;

    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await userService.getProfile(user.id);
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
