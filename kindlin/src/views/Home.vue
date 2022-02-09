<template>
  <div>
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      secretMessage: '',
      username: ''
    };
  },
};
</script>