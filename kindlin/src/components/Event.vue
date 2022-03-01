<template>
  <div @click="toggleShow()" class="event">
    <h3>
      {{ event.eventName }}

      <fa @click="onDeleteEvent(event.id)" class="icon" icon="times" />
    </h3>
    <Button @click="goToEvent(event.id)" text="Go to event" color="teal" />

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
import { dbService } from "../services/dbservice";
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
    async goToEvent(eventID){
      //Uppdatera eventet
      let stage = await dbService.getStage();

      if(stage.started==="false"){
         stage.event = eventID;
        await dbService.updateStage(stage);
        this.$router.push("/LiveEvent");
      }
      else if(stage.started ==="true" && stage.event === eventID) {
        stage.event = eventID;
        await dbService.updateStage(stage);
        this.$router.push("/LiveEvent");
      } 
      else {
        return;
      }
    
  }
  },
  computed: {
    computedDate: function () {
      let date = new Date(this.event.eventTime);
      return date.toString();
    },
  },
};
</script>

<style scoped>
.eventInfo {
  color: black;
  justify-content: center;
  display: inline-block;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}

.icon {
  color: red;
}
.event {
  color: black;
  background: skyblue;
  margin: 5px;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  z-index: 99;
}
.event h3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
