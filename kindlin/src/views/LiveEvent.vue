<template>
<div class="background">
  <div v-if="state === 'waiting'">{{ Waiting }}<Waiting /></div>
   <div v-if="state === 'ready'">{{ Ready }}<Ready /></div>
  <div v-else-if="state === 'dating'">{{ Dating }}<Dating /></div>
  <div v-else-if="state === 'review'">{{ Review }}<Review /></div>
  <div v-if="state === 'done'">{{ Done }}<Done /></div>
  </div>
</template>

<script>
import { firestoreDB } from "../services/db";
import { doc, onSnapshot } from "firebase/firestore";
import Waiting from "../components/LiveEvent/Waiting";
import Ready from "../components/LiveEvent/Ready";
import Dating from "../components/LiveEvent/Dating";
import Review from "../components/LiveEvent/Review";
import Done from "../components/LiveEvent/Done";


export default {
  name: "Event Stage",
  components: {
    Waiting,
    Dating,
    Review,
    Ready,
    Done,
  },
  data() {
    return {
      stage: {},
    };
  },

  async created() {
    this.stage = await firestoreDB.getStage();

    onSnapshot(doc(firestoreDB.db, "stage/stage"), (doc) => {
      this.stage = doc.data();
    });
  },
  computed: {
    state: function () {
      if (this.stage) {
        return this.stage.state;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.background{
  
  background-image: url("../assets/holly.jpg");
  background-size: cover;
  position: absolute;
  z-index: -10;
  height: 100%;
  width: 100%;
}
</style>
