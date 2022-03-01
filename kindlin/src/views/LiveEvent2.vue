<template>
  <div v-if="state === 'waiting'">{{ Waiting }}<Waiting /></div>
  
  <div v-else-if="state === 'ready'">{{ Ready }}<Ready /></div>
  <div v-else-if="state === 'dating'">{{ Dating }}<Dating /></div>
  <div v-else-if="state === 'review'">{{ Review }}<Review /></div>
  <div v-if="state === 'done'">{{ Done }}; <Done/></div>
</template>

<script>
import { dbService } from "../services/dbservice";
import Waiting from "../components/LiveEvent/Waiting";
import Ready from "../components/LiveEvent/Ready";
import Dating from "../components/LiveEvent/Dating";
import Review from "../components/LiveEvent/Review";
import Done from "../components/LiveEvent/Done";

export default {
  name: "Live Events",
  components: {
    Waiting,
    Ready,
    Dating,
    Review,
    Done,
  },
  data() {
    return {
      stage: {},
      state: "",
    };
  },

  async created() {
    this.stage = await dbService.getStage();
    this.state = this.stage.state;
    window.setInterval(async () => {
      this.stage = await dbService.getStage();
      this.state = this.stage.state;
    }, 3000);
  },
};
</script>

<style scoped></style>
