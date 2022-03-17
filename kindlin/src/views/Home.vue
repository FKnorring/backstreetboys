<template>
  <BG />
  <Loader v-if="!loaded"/>
  <div v-if="loaded" class="page">
    <div class="logo">
      <Logo size="5"></Logo>
    </div>
    <div class="welcome">
      <h4>Welcome {{ username }}</h4>
      <h5 v-if="activeEvent" style="color: red">You have one active event!</h5>
    </div>
    <div
      @click="this.$router.push('/upcomingevents')"
      class="cardhome upcoming"
    >
      <h4>Upcoming events</h4>
      <fa class="black" icon="calendar" />
    </div>
    <div
      @click="this.$router.push('/myevents')"
      class="cardhome my"
      :class="{ active: activeEvent }"
    >
      <h4>My events</h4>
      <fa class="black" icon="calendar-check" />
    </div>
    <div
      @click="this.$router.push('/previousmatches')"
      class="cardhome previous"
    >
      <h4>Previous matches</h4>
      <fa class="black" icon="heart" />
    </div>
    <div @click="this.$router.push('/profile')" class="cardhome profile">
      <h4>Profile</h4>
      <fa class="black" icon="user" />
    </div>
    <p @click="logout" class="logout">Log out</p>
  </div>

</template>

<script>
// import { dbService } from "../services/dbservice";
import { firestoreDB } from "../services/db";
import Logo from "../components/Logo.vue";
import BG from "../components/BG.vue";
import Loader from "../components/Loader.vue"
export default {
  data() {
    return {
      activeEvent: false,
      events: [],
      username: "",
      loaded: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
  async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    //let profile = await dbService.getProfile(user.id);
    let profile = await firestoreDB.getProfile(user.id);
    this.username = profile.name;
    profile.myEvents.forEach(async eventId => {
      let event = await firestoreDB.getEvent(eventId)
      if (event.eventHasStarted) this.activeEvent = true;
    })
    this.loaded = true;
  },
  components: { Logo, BG, Loader },
};
</script>

<style scoped>
.logo {
  margin-top: 75px;
}

.events {
  border: none;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0;
  margin: 0;
  cursor: pointer;
  height: min-content;
  background: #e2b37d;
  transition: height 0.5s ease;
}

.scrollbox {
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  max-height: 200px;
  border-radius: 10px;
  outline: solid 1px black;
}

.joinButton {
  cursor: default;
  background: gray;
}

.active {
  cursor: pointer;
  background: green;
}

.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.myevents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardhome {
  display: flex;
  width: 65vw;
  padding: 0 10vw;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 0, 0, 0.3);
  outline: outset 1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  cursor: pointer;
}

.upcoming {
  background-image: url("../assets/angstrom_interior_1100.jpg");
  background-size: 100%;
}

.previous {
  background-image: url("../assets/mountains.jpg");
  background-size: cover;
  background-position: center;
}

.my {
  background-image: url("../assets/people.jpg");
  background-size: cover;
  background-position: center;
}

.active {
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.7), 0px 0px 8px rgba(255, 0, 0, 1);
  text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.7), 0px 0px 8px rgba(255, 0, 0, 1);
}

.profile {
  background-image: url("../assets/profile.jpg");
  background-size: cover;
  background-position: center;
}

.black {
  color: #222;
}

.logout {
  font-weight: 500;
  cursor: pointer;
}
</style>
