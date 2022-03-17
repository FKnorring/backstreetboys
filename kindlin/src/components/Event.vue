<template>
  <div @click="toggleShow()" class="event">
    <h3>
      {{ event.eventName }}

      <fa @click="onDeleteEvent(event.id)" class="icon" icon="times" />
    </h3>
    <Button @click="goToEvent(event.id)" text="Go to event" color="#444" />

    <p>{{ computedDate }}</p>
    <div v-if="showEvent" class="eventInfo">
      <p>Registered Females {{ event.eventUsersFemale.length }}/10</p>
      <p>Registered Males {{ event.eventUsersMale.length }}/10</p>
      {{ event.eventInfo }}
      {{ event.location }}
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import { firestoreDB } from "../services/db";
export default {
  data() {
    return {
      showEvent: false,
    };
  },
  name: "Event",
  props: {
    event: Object,
  },
  components: {
    Button,
  },
  methods: {
    onDeleteEvent(id) {
      this.$emit("delete-event", id);
    },
    onEventClick() {
      console.log("TJO");
    },
    toggleShow() {
      this.showEvent = !this.showEvent;
    },
    async goToEvent(eventID) {
      let stage = await firestoreDB.getStage();
      console.log("hello");
      if (stage.started == false) {
        stage.event = eventID;
        await firestoreDB.setStage(stage);
        console.log("Hej");
        this.$router.push("/LiveEvent");
      } else if (stage.started && stage.event === eventID) {
        stage.event = eventID;
        await firestoreDB.setStage(stage);
        this.$router.push("/LiveEvent");
      } else {
        return;
      }
    },
  },
  computed: {
    computedDate: function () {
      let date = new Date(this.event.eventTime);
      return date.toDateString();
    },
  },
};
</script>

<style scoped>
.eventInfo {
  color: white;
  justify-content: center;
  display: inline-block;
  padding: 10px;
  background:rgb(51, 51, 51);
  border-radius: 5px;
  border: 1px black;
}

.icon {
  color: red;
}
.event {
   background: rgb(41, 41, 41);
  margin: 20px 0;
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  justify-content: center;
  z-index: 99;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 0, 0, 0.3);
}
.event h3 {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event p { 
  color: white; 
}
</style>
