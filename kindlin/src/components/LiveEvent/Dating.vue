<template>
  <div class="date">
  <h1>The participants are currently dating!</h1>
  <div class="dating">
  <Button @click="nextRound()" id="button" color="#444" class="state" text="End round"/>
  </div>
  </div>
</template>

<script>
import { firestoreDB } from "../../services/db";
import Button from "../Button";
//import { doc, onSnapshot } from "firebase/firestore";
export default {
  name: "Dating",
  methods: {
    async updateState() {
      let stage = await firestoreDB.getStage();
      stage.state = "review";
      await firestoreDB.setStage(stage);
    },
    nextRound(){
      if (confirm("Are you sure?")) {
        this.updateState();
      
     };
   },
  },
 
 components: {
    Button,
  },
}
</script>

<style>
.date {
  margin-top: 15rem;
}
.dating {
  display: flex;
  justify-content: center;
}

#button{
  font-size: 30px;
}

h1 {
  color: #fa6d6b;
}

</style>
