<template>
  <BG />
  <div v-if="this.waitingToStart" class="page">
    <div class="info">
      <h3>Waiting for event</h3>
      <h3 class="eventName">{{ eventName }}</h3>
      <h3>to start</h3>
    </div>
    <div class="lds-heart"><div></div></div>
    <div v-if="event" class="joined">
      <h3>{{ joinedUsers }} / 20</h3>
    </div>
  </div>
  <div v-else class="waiting"> <!-- Man väntar på nästa omgång -->
    <h1 class="h1"> Waiting for next round </h1>
    <div class="lds-heart"><div></div></div>
  </div>
</template>

<script>
//import { dbService } from "../../services/dbservice";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../services/db";
import BG from "../BG.vue";

export default {
  name: "Waiting",
  data() {
    return {
      eventName: "",
      stage: {},
      event: { activeUsersMale: [], activeUsersFemale: [] },
      waitingToStart: true,
    };
  },

  methods: {
    async getEventName() {
      this.eventName = this.event.eventName;
    },
  },
  async created() {
    this.stage = await firestoreDB.getStage();
    if(this.stage.stage > 0){
      this.waitingToStart = false;
    }
    this.event = await firestoreDB.getEvent(this.stage.event);
    await this.getEventName();
    onSnapshot(doc(firestoreDB.db, "events/" + this.stage.event), (doc) => {
      this.event = doc.data();
    });
  },
  components: { BG },
  computed: {
    joinedUsers: function () {
      if (this.event) {
        return (
          this.event.activeUsersMale.length +
          this.event.activeUsersFemale.length
        );
      } else {
        return 0;
      }
    },
  },
};
</script>

<style>

.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #de9190;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #de9190;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}


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
  filter: brightness(140%);
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

.h1{
  margin-top:16rem;
  margin-bottom: 2.5rem;
  filter: brightness(140%);
  /*text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; */
}

.waiting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #db8382;
  flex:auto;
  font-weight: 600;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.45);
}
</style>
