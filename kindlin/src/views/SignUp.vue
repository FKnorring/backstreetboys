<template>
  <h1>Create account</h1>
  <fa icon="fire" :size="iconsize" color="#fa6d6b" />
  <div class="signUp">
    <div class="input">
      <p>Email</p>
      <div class="span">
        <fa class="fa" icon="envelope" />
        <input type="email" v-model="email" />
      </div>
    </div>
    <div class="input">
      <p>Password</p>
      <div class="span">
        <fa class="fa" icon="lock" />
        <input type="password" v-model="password" />
      </div>
    </div>
    <div class="input">
      <p>Retype Password</p>
      <div class="span">
        <fa class="fa" icon="lock" />
        <input type="password" v-model="password_repeat" />
      </div>
    </div>
  </div>
  <div class="button">
    <button @click="handleSubmit" class="signUP">Sign Up</button>
    <!-- <input type="button" @click="handleSubmit" value="Sign Up" /> -->
    <p v-if="msg">{{ msg }}</p>
  </div>
  <p @click="$router.push('/login')">Log in</p>
</template>
<script>
import { dbService } from "../services/dbservice";
import Button from "../components/Button";

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
  component: { Button },
};
</script>

<style scoped>
.signUp {
  width: 70vw;
  padding: 0 5vw;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 30px;
  padding-bottom: 10px;
}

.button {
  align-items: center;
  display: flex;
  justify-content: center;
}
.signUP {
  background: #fa6d6b;
  color: #fff;
  border: none;
  padding: 7px 12px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: inherit;
}

.input {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.span {
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.05);
}

.input p {
  text-align: left;
  margin: 0;
}

input {
  width: 100%;
  border: none;
  background-color: #eee;
  padding: 5px 0;
  font-size: 0.75rem;
  font-weight: 300;
  background: transparent;
}

input:focus {
  outline: none;
}

input[type="button"] {
  display: flex;
  border: black 1px;
  font-size: 120%;
  font-weight: 800;
  background-color: #de9190;
  border-radius: 20px;
  width: 100px;
  margin: auto;
  align-items: center;
  margin-left: 45%;
  position: relative;
  padding-left: 0.8em;
}

.fa {
  margin-right: 5px;
  padding: 5px;
  color: black;
}

h1 {
  margin: 10px 0;
  margin-top: 180px;
}
</style>
