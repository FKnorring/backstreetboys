<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Event Name</label>
      <input
        type="text"
        v-model="eventName"
        name="eventName"
        placeholder="Add event name"
      />
    </div>
    <div class="form-control">
      <label>Event Location</label>
      <input
        type="text"
        v-model="eventLocation"
        name="eventLocation"
        placeholder="Add event location"
      />
    </div>
    <div class="form-control">
      <label>Event Time</label>
      <input type="datetime-local" v-model="eventTime" name="eventTime" />
    </div>
    <div class="form-control">
      <label>Event Info</label>
      <input
        type="text"
        v-model="eventInfo"
        name="eventInfo"
        placeholder="Add event info"
      />
    </div>

    <input type="submit" value="Save Event" class="btn btn-block" />
  </form>
</template>
<script>
export default {
  name: "AddEvent",
  data() {
    return {
      eventUsersMale: [],
      activeUsersMale: [],
      eventUsersFemale: [],
      activeUsersFemale: [],
      eventMatches: [],
      eventName: "",
      eventLocation: "",
      eventInfo: "",
      eventTime: "",
      eventHasStarted: false,
      eventMatches1: [],
      eventMatches2: [],
      eventMatches3: [],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.eventName) {
        alert("Please add an event");
        return;
      }

      const newEvent = {
        eventUsersMale: this.eventUsersMale,
        activeUsersMale: this.activeUsersMale,
        eventUsersFemale: this.eventUsersFemale,
        activeUsersFemale: this.activeUsersFemale,
        eventName: this.eventName,
        eventTime: this.eventTime,
        eventLocation: this.eventLocation,
        eventInfo: this.eventInfo,
        eventHasStarted: this.eventHasStarted,
        eventMatches1: this.eventMatches1,
        eventMatches2: this.eventMatches2,
        eventMatches3: this.eventMatches3,
      };
      this.$emit("add-event", newEvent);
      this.eventUsersMale = [];
      this.activeUsersMale = [];
      this.eventUsersFemale = [];
      this.activeUsersFemale = [];
      this.eventMatches1 = [];
      this.eventMatches2 = [];
      this.eventMatches3 = [];
      this.eventName = "";
      this.eventLocation = "";
      this.eventInfo = "";
      this.eventTime = "";
      this.eventHasStarted = false;
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 90%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 10px;
  border: none;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}

label {
  color: white;
}
</style>
