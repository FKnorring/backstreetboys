<template>
  Review
  <button @click="updateState()" class="state"> Go to next round</button>
</template>

<script>

import { dbService } from "../../services/dbservice";
export default {
  name: "Review",
  methods: {
    async updateState(){
        let stage = await dbService.getStage();
        if (stage.stage === 3) {
          stage.state = "done"
          await dbService.updateStage(stage)
        } 
        else{
          stage.state = "ready";
          stage.stage = stage.stage +1 ;
          await dbService.updateStage(stage);   
        }
     }
  }
}
</script>

<style>

</style>