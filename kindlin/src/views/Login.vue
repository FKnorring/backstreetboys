<template>
  <div class="page">
    <div class="logo">
      <h1>Welcome to</h1>
      <Logo size="5"></Logo>
    </div>
    <div class="container-login">
      <h2>Login</h2>
      <form>
        <div class="input">
          <p>Email</p>
          <div class="span">
            <fa class="fa" icon="envelope" />
            <input :class="{ show: error }" type="email" v-model="email" />
          </div>
        </div>

        <div class="input">
          <p>Password</p>
          <div class="span">
            <fa class="fa" icon="lock" />
            <input
              :class="{ show: error }"
              type="password"
              v-model="password"
            />
          </div>
        </div>

        <input
          type="button"
          class="login"
          @click="handleSubmit"
          value="Login"
        />
        <p v-if="msg">{{ msg }}</p>
      </form>
      <p v-if="error" class="error">wrong email or password</p>
    </div>
  </div>
  <Button @click="$router.push('/sign-up')" color="transparent" text="Sign up" class="signUp"/>
</template>
<script>
import { dbService } from "../services/dbservice";
import Logo from "../components/Logo.vue";
import Button from "../components/Button";

export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      error: false,
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

      await dbService.login(this.email, this.password).catch((err) => {
        this.error = true;
        throw err;
      });
      this.$router.push("/");
    },
    logout() {
      dbService.logout();
    },
  },
  components: { Logo, Button, },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
}

.logo {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
}

.logo h1 {
  font-weight: 900;
  color: #fa6d6b;
}

.login {
  color: white;
  background-color: #fa6d6b;
}

.login:hover{
  cursor: pointer;
}

.container-login {
  width: 70vw;
  padding: 0 5vw;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05), 0px 0px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  padding-bottom: 10px;
}

h2 {
  margin: 10px 0;
}

.input {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.input p {
  text-align: left;
  margin: 0;
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

input {
  width: 100%;
  border: none;
  padding: 5px 0;
  font-size: 0.75rem;
  font-weight: 300;
  background: transparent;
}

input:focus {
  outline: none;
}

input[type="button"] {
  border: black 1px;
  font-size: 120%;
  background-color: #fa6d6b;
  border-radius: 20px;
  width: 100px;
}
.signUp {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  top: 15px;
  text-decoration: underline;
  font-size: 130%;
  color: #fa6d6b;
}
.fa {
  margin-right: 5px;
  padding: 5px;
  color: black;
}

.show {
  text-decoration: underline red 2px;
}

.error {
  color: red;
  text-decoration: underline;
  text-decoration-color: red;
  font-weight: 200;
}
</style>
