<template>
  <h1 v-if="username">{{ username }}</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/organizer">Organizer</router-link> |
    <router-link to="/completeprofile">Complete Profile</router-link> |
    <router-link to="/previousmatches">Previous Matches</router-link> |
    <router-link to="/eventstage">Event Stage</router-link>
  </div>
  <div class="icon-container">
    <fa @click="home()" class="icon" icon="house" />
    <fa @click="search()" class="icon" icon="magnifying-glass" />
    <fa @click="previousMatch()" class="icon" icon="heart" />
    <fa @click="profile()" class="icon" icon="user" />
  </div>
  <router-view />
</template>
<script>
import { userService } from "./services/userService";

export default {
  data() {
    return {
      username: "Not logged in",
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

    async getUser(user) {
      if (user) {
        let profile = await userService.getProfile(user.id);
        return (this.username = profile[0].name);
      }
    },
  },
  created() {},
  watch: {
    $route() {
      let loggedIn = JSON.parse(localStorage.getItem("user"));
      if (loggedIn) {
        this.username = this.getUser(loggedIn.user);
      } else {
        this.username = "Not logged in";
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
  position: fixed;
  background: rgb(255, 254, 254);
  bottom: 0;
  height: 65px;
  width: 100%;
}

.icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  cursor: pointer;
}

.icon:hover {
  background: #bbbbbb;
}
</style>
