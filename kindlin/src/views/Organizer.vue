<template>
  <li v-for="user in users" :key="user.email">
    {{ user.email }}
  </li>
  <button @click="logusers">get</button>
</template>

<script>
//import { userService } from "../services/userService";

export default {
  data() {
    return {
      users: [
        {
          email: "test@test",
          id: 2,
        },
        {
          email: "a@a",
          id: 3,
        },
      ],
    };
  },
  methods: {
    logusers() {
      console.log(this.users);
      this.users.forEach((user) => {
        console.log(user);
      });
    },
  },
  /*created() {
    this.users = userService.getAll();
    console.log(this.users);
  },*/
};
</script>

<style></style>
