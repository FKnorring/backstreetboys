<template>
  <div>
    <h1>My events</h1>
    <div v-for="event in myEvents" :key="event" class="events">
        <h2>{{event.name}}</h2>
        <h3>{{event.location}}</h3>
        <h3>{{event.time}}</h3>
        <button @click ="leaveEvent(event.id)" class="leaveButton"> leave </button>
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
    async leaveEvent(id){
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await userService.getProfile(user.id);
      let myEventIds = profile[0].myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile[0].id;
    
      let updatedIds = myEventIds.filter(ids => ids != id);
      profile[0].myEvents = updatedIds;
      console.log(profile[0]);
      await userService.updateProfile(profile[0], profileId);

      // Hämta och lämna eventet i event databasen
      let event = await userService.getEvent(id);
      let eventUsers = event[0].eventUsers;
      let updatedEventUsers = eventUsers.filter(ids => ids != user.id);
      event[0].eventUsers = updatedEventUsers;
      await userService.updateEvent(event[0], id);
      
      let updatedMyEvents = this.myEvents.filter(ids => ids.id != id);
      this.myEvents = updatedMyEvents;
      
    }
  },
  async created() {
    //this.events = await userService.getEvents();
    
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await userService.getProfile(user.id);
    let eventIds = profile[0].myEvents;

    for(var currentEvent of eventIds){
        let event = await userService.getEvent(currentEvent);
        let eventName = event[0].eventName;
        let eventLocation = event[0].eventLocation;
        let eventTime = event[0].eventTime;
        let eventId = event[0].id;
        let eventInfo = {name : eventName, location : eventLocation, time: eventTime, id: eventId};
        this.myEvents.push(eventInfo);
    }
  },
};
</script>

<style scooped>
.events{
    border-style:solid;
    width:70%;
    margin:auto;
    margin-top: 2em;    
}


</style>
