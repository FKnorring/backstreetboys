<template>
  <h1 v-if="username">{{ username }}</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/organizer">Organizer</router-link> |
    <router-link to="/completeprofile">Complete Profile</router-link> |
    <router-link to="/previousmatches">Previous Matches</router-link>
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
      if (loggedIn) this.username = this.getUser(loggedIn.user);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir LTS, Helvetica, Arial, sans-serif;
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
</style>
