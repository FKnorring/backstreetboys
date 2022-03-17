<template>
  <div v-if="state === 'waiting'"> {{ Waiting }} <Waiting /></div>
  <div v-if="state === 'ready'">{{ Waiting }}<Waiting /></div>
  <div v-else-if="state === 'dating'">{{ Dating }}<Dating /></div>
  <div v-else-if="state === 'review'">{{ Review }}<Review /></div>
  <div v-if="state === 'done'">{{ Done }}<Done /></div>
</template>

<script>
import { firestoreDB } from "../services/db";
import { doc, onSnapshot } from "firebase/firestore";
import Waiting from "../components/UserEvent/Waiting";
import Dating from "../components/UserEvent/Dating";
import Review from "../components/UserEvent/Review";
import Done from "../components/UserEvent/Done";

export default {
  name: "Event Stage",
  components: {
    Waiting,
    Dating,
    Review,
    Done,
  },
  data() {
    return {
      stage: {},
    };
  },

  async created() {
    this.stage = await firestoreDB.getStage();
    if(this.stage.event === -1){
      this.$router.push("/");
    }
    onSnapshot(doc(firestoreDB.db, "stage/stage"), (doc) => {
      this.stage = doc.data();
      if(this.stage.event === -1){
        this.$router.push("/");
      }
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

<style scoped></style>
