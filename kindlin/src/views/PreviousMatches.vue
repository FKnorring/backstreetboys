<template>
    <h1>Previous Matches </h1>
    <div v-for="match in matches" :key="match" class="matches">
        <h2>{{match.name}}</h2>
        <h3>{{match.number}}</h3>
    </div>
</template>

<script>
//import { userService } from "../services/userService";

export default{
    data(){
        return{
            matches: []
        }
    },
    created() {
        //let user = JSON.parse(localStorage.getItem("user")).user;
        
        this.matches =[
            {
                name : "Kalle Anka",
                number : "112"
            },
            {
                name : "Donald Trump",
                number: "1177"
            }
        ]
    }

}
</script>

<style scoped>

</style>