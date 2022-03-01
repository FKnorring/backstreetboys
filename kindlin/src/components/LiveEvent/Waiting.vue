<!--
<template>Waiting</template>

<script>
export default {
  name: "Waiting",
};
</script>
-->

<template>
  <div class="event-info"></div>
  <div class="registered-users">
    <div class="user-container male">
      <h3>Registered Males</h3>
      <div class="start-event">
        <button @click="startEvent()">Start Event</button>
        <button @click="updateStage()" class="startRound">start round</button>
        <button @click="endEvent()" class="startRound">End Event</button>
      </div>
      <div class="users">
        <div v-for="male in males" :key="male">
          <p>{{ male.name }}</p>
        </div>
      </div>
      <p>{{ males.length }}/10</p>
    </div>
    <div class="user-container female">
      <h3>Registered Females</h3>
      <div class="users">
        <div v-for="female in females" :key="female">
          <p>{{ female.name }}</p>
        </div>
      </div>
      <p>{{ females.length }}/10</p>
    </div>
  </div>

</template>

<script>
import { dbService } from "../../services/dbservice";

export default {
    name: "Waiting",
    data() {
        return {
            stage: {},
            event: {},
            males: [],
            females: [],
        
          };
        },
        methods: {
          async startEvent() {

            if(this.males.length != 10 || this.females.length != 10){
              return;
            }

            let stage = await dbService.getStage();
            stage.started = "true";
            await dbService.updateStage(stage);

            let event = await dbService.getEvent(stage.event);
            event.eventHasStarted = true;
            await dbService.updateEvent(event, stage.event);
          },
          async getStage() {
            let stage = await dbService.getStage();
            return stage;
          },
          async getEvent() {
            return await dbService.getEvent(this.stage.event);
          },
          async getMales() {
            let eventUsersMale = this.event.eventUsersMale;
            let males = [];
            for (let i = 0; i < eventUsersMale.length; i++) {
              let male = await dbService.getProfile(eventUsersMale[i]);
              males.push(male[0]);
            }
            return males;
          },
          async getFemales() {
            let eventUsersFemale = this.event.eventUsersFemale;
            let females = [];
            for (let i = 0; i < eventUsersFemale.length; i++) {
              let female = await dbService.getProfile(eventUsersFemale[i]);
              females.push(female[0]);
            }
            return females;
          },
          async endEvent() {
            let stage = await dbService.getStage();
            stage.event = -1;
            stage.started = "false";
            stage.stage = 0;
            stage.state = "waiting";
            await dbService.updateStage(stage);
            this.$router.push("/organizer");
          },
          async updateStage() {
            let stage = await dbService.getStage();
            stage.state = "ready";
            stage.stage = stage.stage +1;
            await dbService.updateStage(stage);
            
          },

        async created() {
          this.stage = await this.getStage();
          if (this.stage.event > 0) {
            this.event = await this.getEvent();
            this.males = await this.getMales();
            this.females = await this.getFemales();

            window.setInterval(async () => {
            this.stage = await this.getStage();
            if (this.stage.event > 0) {
              this.event = await this.getEvent();
              this.males = await this.getMales();
              this.females = await this.getFemales();
            }
          }, 500000);
          }
        },
      },
}
</script>

<style scoped>
      .registered-users {
        display: flex;
      }

      .user-container {
        margin: 0.1em;
        border: solid 1px #444;
        border-radius: 10px;
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .users {
        width: 100%;
        height: 250px;
        outline: solid 1px black;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.05);
        overflow-y: scroll;
        overflow-x: hidden;
      }

      .match {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }

      .users p {
        margin: 0;
        padding: 0.25em;
      }

      .female p {
        color: red;
      }

      .male p {
        color: blue;
      }

      .match p {
        text-align: center;
      }
</style>
