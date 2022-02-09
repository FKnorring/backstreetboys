<template>
  <div>
    <h1>Sign Up</h1>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input
      type="password"
      placeholder="Password (repeat)"
      v-model="password_repeat"
    />
    <input type="button" @click="handleSubmit" value="Sign Up" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>

import { userService } from "../services/userService";

export default {
  data() {
    return {
      password: "",
      password_repeat: "",
      msg: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.checkPassword()) {
        userService.signUp(this.email, this.password);
      } else {
        alert("Passwords do not match");
      }
    },
    checkPassword() {
      return this.password === this.password_repeat;
    },
  },
};
</script>
