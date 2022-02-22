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
import { dbService } from "../services/dbservice";

export default {
  data() {
    return {
      email: "",
      password: "",
      password_repeat: "",
      msg: "",
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (this.checkPassword()) {
        await dbService.signUp(this.email, this.password);
        await dbService.login(this.email, this.password);
        this.$router.push("/completeprofile");
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
