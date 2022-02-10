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
import { userService } from "../services/userService";

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
      await userService.login(this.email, this.password);
      this.$router.push("/profile");
    },
    logout() {
      userService.logout();
    },
  },
};
</script>
