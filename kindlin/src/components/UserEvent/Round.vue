<template>
  <BG />
  <div class="page">
    <div class="info">
      <h3>Next date will begin shortly</h3>
    </div>
    <div class="loader"></div>
  </div>
</template>

<script>
//import { dbService } from "../../services/dbservice";
//import { doc, onSnapshot } from "firebase/firestore";
//import { firestoreDB } from "../../services/db";
//import BG from "../BG.vue";

export default {
  name: "Round",
};
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  margin: 10em 0;
  display: flex;
  flex-direction: column;
  width: 200px;
}

.loader {
  margin-top: 20px;
  border: 7px solid #f3f3f3;
  border-top: 7px solid #de9190;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.joined {
  margin-top: 2em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.eventName {
  font-weight: 900;
  margin: 0;
}
h3 {
  color: #db8382;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.45);
}
</style>
