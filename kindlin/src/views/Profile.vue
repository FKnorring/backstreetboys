<template>
  <div >
    <h1>{{ username }}</h1>
    <h2>{{ age }}</h2>
    <h2>{{ gender }}</h2>
    <h2>{{ occupation }}</h2>
    <input v-model="id" type="text" />
    <button @click="getUser">get user</button>
    <h2>{{ email }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      path: "http://localhost:3000/users/",
      username: "USERNAME",
      gender: "GENDER",
      age: "AGE",
      email: "EMAIL@email.com",
      occupation: "OCCUPATION",
      interest1: "interest1",
      interest2: "interest2",
      interest3: "interest3",
      interest4: "interest4",
      interest5: "interest5",
      bio: "",
    };
  },
  methods: {
    getUser() {
      fetch(this.path + this.id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.username = data.username;
          this.email = data.email;
        });
    },
  },
};
</script>

<style scoped>

</style>
