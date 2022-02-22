<template>
  
  <div @click="showEvent = true" class = "event">
  <div class="eventInfo">
    <h3>
     {{ event.eventName }}
      <fa @click="onDeleteEvent(event.id)" class="icon" icon="times"/>
    </h3>
    <p>{{event.eventTime}}</p>
    </div>
  </div>
  
<script>


export default {
  name: "Event",
  props: {
    event: Object,
  },
  methods:{
    onDeleteEvent(id){
      this.$emit('delete-event', id);
    },
    onEventClick(){
      console.log("TJO");
    },
  },
};
</script>

<style scoped>
.eventInfo{
  
}


.icon {
  color: red;
}
.event {
  background: skyblue;
  margin: 5px;
  padding: 10px 10px;
  border-radius: 25px;
  cursor: pointer;
  justify-content: center;

}
.event h3 {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
