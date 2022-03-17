<template>
  <div class="done">
    <h1>Done with the event!</h1>
    <div class="button">
      <button @click="endEvent()" class="buttonDone">End Event</button>
    </div>
    <!-- <Button class="buttonDone" @click="endEvent()" text="End event" color="red"/> -->
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";

export default {
  name: "Done",
  methods: {
    async endEvent() {
      await this.checkAllMatches();
      let stage = await firestoreDB.getStage();
      let event = await firestoreDB.getEvent(stage.event);
      stage.event = -1;
      stage.started = "false";
      stage.stage = 0;
      stage.state = "waiting";
      await firestoreDB.setStage(stage);

      event.eventHasStarted = false;
      await firestoreDB.updateEvent(event.id, event);

      this.$router.push("/organizer");
    },
    async checkAllMatches() {
      let stage = await firestoreDB.getStage();
      let event = await firestoreDB.getEvent(stage.event);
      let females = event.eventUsersFemale;
      for (const person of females) {
        this.checkForMatch(person);
      }
      let males = event.eventUsersMale;
      for (const person of males) {
        this.checkForMatch(person);
      }
    },
    async checkForMatch(person) {
      let profile = await firestoreDB.getProfile(person);
      let acceptedMatches = [];
      if (profile.eventMatches) {
        let myMatches = profile.eventMatches;
        for (const id of myMatches) {
          let matchingPerson = await firestoreDB.getProfile(id);
          if (matchingPerson.eventMatches) {
            let thereMatches = matchingPerson.eventMatches;
            for (const thereIds of thereMatches) {
              if (thereIds == profile.userId) {
                acceptedMatches.push(id);
              }
            }
          }
        }
        let newMatches = profile.previousMatches;
        console.log(newMatches);
        for (const newId of acceptedMatches) {
          newMatches.push(newId);
        }
        profile.previousMatches = newMatches;
        await firestoreDB.updateProfile(profile.userId, profile);
      }
    },
  },
};
</script>

<style scoped>
.done {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button {
  align-items: center;
  display: flex;
  justify-content: center;
}

.buttonDone {
  background: #ca0f0c;
  color: rgb(252, 252, 252);
  font-weight: 800;
  border: none;
  padding: 7px 12px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: inherit;
  width: 100px;
}
</style>
