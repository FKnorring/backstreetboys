<template>
  <div>
    <h1>My events</h1>
    <li v-for="event in events" :key="event">
      {{ event.eventName }} {{ event.eventTime }} {{ event.eventLocation }}
    </li>
    <p>{{ secretMessage }}</p>
  </div>
</template>

<script>
import { userService } from "../services/userService";
export default {
  data() {
    return {
      events: [],
      secretMessage: "",
      username: "",
    };
  },
  methods: {},
  async created() {
    this.events = await userService.getEvents();
  },
};
</script>
