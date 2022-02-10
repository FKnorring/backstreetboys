<template>
  <div>
    <h1> My events</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" @click="test" value="get my events!" />
   
  </div>
</template>

<script>
import { userService } from "../services/userService";
export default {
  data() {
    return {
      
      secretMessage: '',
      username: ''
    };
  },
  methods: {
    test() {
      console.log(userService.getEvents());
    },
    }
  
  
};
</script>