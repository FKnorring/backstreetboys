<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="handleSubmit" value="Login" />
    <button @click="logout">log out</button>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import { dbService } from "../services/dbservice";

export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    login() {
      return {
        email: this.email,
        password: this.password,
      };
    },
    async handleSubmit(e) {
      e.preventDefault();
      await dbService.login(this.email, this.password);
      this.$router.push("/profile");
    },
    logout() {
      dbService.logout();
    },
  },
};
</script>
