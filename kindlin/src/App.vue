<template>
  <h1 v-if="username">{{ username }}</h1>
  <div v-if="dev" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/organizer">Organizer</router-link> |
    <router-link to="/completeprofile">Complete Profile</router-link> |
    <router-link to="/previousmatches">Previous Matches</router-link> |
    <router-link to="/eventstage">Event Stage</router-link> |
    <router-link to="/liveevent">Live Event</router-link>
  </div>
  <div v-if="user" class="icon-container">
    <fa @click="home()" class="icon" icon="house"></fa>
    <fa @click="search()" class="icon" icon="calendar" />
    <fa @click="previousMatch()" class="icon" icon="heart" />
    <fa @click="profile()" class="icon" icon="user" />
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      username: "",
      dev: true,
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    search() {
      this.$router.push("/upcomingevents");
    },

    previousMatch() {
      this.$router.push("/previousmatches");
    },
    profile() {
      this.$router.push("/profile");
    },
  },
  computed: {
    loggedIn: function () {
      return localStorage.getItem("user");
    },
    user: function () {
      if (
        [
          "Home",
          "Profile",
          "UpcomingEvents",
          "PreviousMatches",
          "EventStage",
          "MyEvents",
        ].includes(this.$route.name)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

#app {
  font-family: "Nunito", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  background: #eee;
  bottom: 0;
  height: 65px;
  width: 100%;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.icon {
  display: flex;
  align-items: center;
  color: #666;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  cursor: pointer;
}

.icon:hover {
  background: none;
}

body {
  margin: 0;
}

@media only screen and (max-width: 600px) {
  #nav {
    visibility: hidden;
    margin: 0;
    padding: 0;
    width: 0;
    height: 0;
  }
}
</style>
