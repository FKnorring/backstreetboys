<template>
  DATING
  <button @click="updateState()" class="state"> pls click me</button>
</template>

<script>
import { dbService } from "../../services/dbservice";
export default {
  name: "Dating",
  methods: {
    async updateState(){
        let stage = await dbService.getStage();
        stage.state = "review";
        await dbService.updateStage(stage);
            
        }
  }
}
</script>

<style>

</style>