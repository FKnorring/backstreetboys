<template>
  <Header @toggle-add-event="toggleAddEvent" title="Events" />
  <div class="container">
    <Button @toggle-add-event=toggleAddEvent() text="Add event" color="green" />
    <div v-show="showAddEvent">
    <AddEvent @add-event="addEvent" />
    </div>
    <Events @delete-event="deleteEvent" class="event" :events="events" />
  </div>
  <!--  
  <li v-for="user in users" :key="user">

    {{ user.email }} <button @click="showUser(user.id)">{{ user.id }}</button>
    <p v-show="user.id === userId">{{ profile }}</p>
  </li>
 -->
</template>

<script>
import { dbService } from "../services/dbservice";
import Header from "../components/Header";
import Events from "../components/Events";
import Button from "../components/Button";
import AddEvent from "../components/AddEvent";

export default {
  name: "Organizer",
  components: {
    Header,
    Events,
    Button,
    AddEvent,
  },
  data() {
    return {
      showAddEvent: false,
      events: [],
      users: [],
      userId: -1,
      profile: {},
    };
  },
  methods: {
    toggleAddEvent() {
      this.showAddEvent = !this.showAddEvent
    },
    addEvent(event) {
      console.log(event);
      this.events = [...this.events, event];
      console.log(this.event);
      dbService.addEvent(event);
      
    },
    deleteEvent(id) {
      if (confirm("Are you sure?")) {
        this.events = this.events.filter((event) => event.id !== id);
         dbService.removeEvent(id);
      }
    },
    async showUser(id) {
      if (this.userId === id) {
        return (this.userId = -1);
      }
      const profile = await dbService.getProfile(id);
      this.profile = profile[0];
      this.userId = id;
    },
  },

  async created() {
    this.events = await dbService.getEvents(); //hämta events;
    
  },
};
</script>

<style>
.container {
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
