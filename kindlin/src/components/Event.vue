<template>
  <div class = "event">
    <h3   @dbclick="onEventClick(event.id)">
  
     {{ event.eventName }}
      <fa @click="onDeleteEvent(event.id)" class="icon" icon="times"/>
      
    </h3>
    <p>{{event.eventTime}}</p>
  </div>
</template>

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
  },
};
</script>

<style scoped>
.icon {
  color: red;
}
.event {
  background: skyblue;
  margin: 5px;
  padding: 10px 10px;
  cursor: pointer;
  justify-content: center;

}
.event h3 {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
