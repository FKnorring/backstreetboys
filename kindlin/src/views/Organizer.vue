<template>
  <li v-for="user in users" :key="user">
    {{ user.email }} <button @click="showUser(user.id)">{{ user.id }}</button>
    <p v-show="user.id === userId">{{ profile }}</p>
  </li>
</template>

<script>
import { userService } from "../services/userService";

export default {
  data() {
    return {
      users: [],
      userId: -1,
      profile: {},
    };
  },
  methods: {
    async showUser(id) {
      if (this.userId === id) {
        return (this.userId = -1);
      }
      const profile = await userService.getProfile(id);
      this.profile = profile[0];
      this.userId = id;
    },
  },
  async created() {
    this.users = await userService.getAll();
  },
};
</script>

<style></style>
