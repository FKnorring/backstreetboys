<template>
  <div>
    <h1>My events</h1>
    <div v-for="event in myEvents" :key="event" class="events">
        <h2>{{event.name}}</h2>
        <h3>{{event.location}}</h3>
        <h3>{{event.time}}</h3>
        <button @click = "joinEvent(event.id)" class="joinButton"> Enter event</button>
        <button @click ="leaveEvent(event.id)" class="leaveButton"> leave </button>
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
    async leaveEvent(id){
      let user = JSON.parse(localStorage.getItem("user")).user;
      let profile = await dbService.getProfile(user.id);
      let myEventIds = profile[0].myEvents; //My Event Ids --> Lägg till id här.
      let profileId = profile[0].id;
    
      let updatedIds = myEventIds.filter(ids => ids != id);
      profile[0].myEvents = updatedIds;
      console.log(profile[0]);
      await dbService.updateProfile(profile[0], profileId);

      // Hämta och lämna eventet i event databasen
      let event = await dbService.getEvent(id);
      let eventUsers = event.eventUsers;
      let updatedEventUsers = eventUsers.filter(ids => ids != user.id);
      event.eventUsers = updatedEventUsers;
      await dbService.updateEvent(event, id);
      
      let updatedMyEvents = this.myEvents.filter(ids => ids.id != id);
      this.myEvents = updatedMyEvents;
    },
  async joinEvent(id){
    let event = await dbService.getEvent(id);
    let updatedUsers = event.activeUsers;
    let user = JSON.parse(localStorage.getItem("user")).user;
    if(!updatedUsers.includes(user.id,0)){
      updatedUsers.push(user.id); 
    }
    event.activeUsers = updatedUsers;
    await dbService.updateEvent(event, id);
  },  
  },
  async created() {
    //this.events = await dbService.getEvents();
    
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await dbService.getProfile(user.id);
    let eventIds = profile[0].myEvents;

    for(var currentEvent of eventIds){
        let event = await dbService.getEvent(currentEvent);
        console.log(event);
        let eventName = event.eventName;
        let eventLocation = event.eventLocation;
        let eventTime = event.eventTime;
        let eventId = event.id;
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
