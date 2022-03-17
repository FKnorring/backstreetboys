<template>
  <div class="info-review">
    <div class="timer">
      <h3> Users are reviewing their date </h3>
      <h3>{{ timercount }} seconds Remaining </h3>
    </div>
    <Button @click="updateState()" color="green" text="Next round" class="state"/>
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";
import Button from "../Button";
export default {
  data() {
    return {
      timercount: 180,
    };
  },
  name: "Review",
  methods: {
    async updateState() {
      let stage = await firestoreDB.getStage();
      if (stage.stage === 3) {
        stage.state = "done";
        await firestoreDB.setStage(stage);
      } else {
        stage.state = "ready";
        stage.stage = stage.stage + 1;
        await firestoreDB.setStage(stage);
      }
    },
  },

  watch: {
    timercount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timercount--;
          }, 1000);
        }
      },
      immediate: true,
    },
  },
  components: {
    Button,
  }
};
</script>

<style>
.info-review{
  margin-top:6rem;
}
.timer{
  font-size: 60px;
  color: #fa6d6b;
}

</style>
