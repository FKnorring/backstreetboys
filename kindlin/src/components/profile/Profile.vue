<template>
  <div class="page">
    <div class="profile">
      <div class="header">
        <h1>{{ user.name }}</h1>
        <img :src="picture" alt="" />
      </div>
      <div class="content">
        <h2 class="key-val">
          Age
          <p>{{ user.age }}</p>
        </h2>
        <h2 class="key-val">
          Gender
          <p>{{ user.gender }}</p>
        </h2>
        <h2 class="key-val">
          Occupation
          <p>{{ user.occupation }}</p>
        </h2>
        <h2> Interests </h2>
        <div class="interests">
        
          <fa
            v-for="interest in interestList"
            :key="interest"
            class="icon"
            :icon="interest"
          />
        </div>
        
        <div class="bio">
          <h3>Bio:</h3>
          <p>{{ user.bio }}</p>
        </div>
      </div>

      <!-- <button @click="removeAcc">Remove Account</button> -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      interestList: [],
      allInterests: [
        "heart",
        "basketball",
        "bicycle",
        "bowling-ball",
        "dumbbell",
        "futbol",
        "person-hiking",
        "brain",
        "person-running",
        "table-tennis-paddle-ball",
        "person-skiing",
        "baseball",
        "archway",
        "volleyball",
        "stopwatch-20",
      ],
    };
  },
  name: "Profile",
  props: {
    user: Object,
  },
  methods: {
    getUserInterests() {
      for (let x = 0; x < 15; x++) {
        if (this.user.interests[x]) {
          this.interestList.push(this.allInterests[x]);
        }
      }
    },
  },
  computed: {
    picture: function () {
      return (
        "https://randomuser.me/api/portraits/" +
        (this.user.gender == "Male" ? "men" : "women") +
        "/" +
        this.user.userId +
        ".jpg"
      );
    },
  },

  created() {
    this.getUserInterests();
  },
};
</script>

<style scoped>
.header {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.header h1 {
  font-weight: 800;
}

.header img {
  border-radius: 100%;
  border: solid 2px black;
  width: 90px;
  margin-bottom: 1em;
}

.header::after {
  content: "";
  position: absolute;
  background: black;
  width: 100%;
  height: 2px;
  top: 100%;
}

.profile {
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.5);
  height: 630px;
  overflow-y: auto;
}

.content {
  margin: 1em;
}

.interests {
  display: flex;
}

.page {
  display: flex;
  place-content: center;
}

.key-val {
  display: flex;
  align-items: center;
}

.key-val p {
  font-weight: 100;
  font-size: 0.75em;
  margin: 0 2em;
}

.bio {
  height: 100px;
}
</style>
