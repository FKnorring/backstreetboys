<template>
    <h1>Previous Matches </h1>
    <div v-for="match in matches" :key="match" class="matches">
        <h2>{{match.name}}</h2>
        <h3>{{match.number}}</h3>
    </div>
</template>

<script>
import { userService } from "../services/userService";

export default{
    data(){
        return{
            userId : 1,
            matches: []
        } 
    },
    async created() {
    let user = JSON.parse(localStorage.getItem("user")).user;
    let profile = await userService.getMatches(user.id);
    let matchIds = profile[0].matches;
    
    for(var match of matchIds){
        let matchedProfile = await userService.getProfile(match);
        let matchedName = matchedProfile[0].name;
        let matchedNumber = matchedProfile[0].phonenumber;
        let matchedInfo = {name : matchedName, number: matchedNumber};
        this.matches.push(matchedInfo);
    }
    }
}
</script>

<style scoped>
.matches{
    border-style:solid;
    width:70%;
    margin:auto;
    margin-top: 2em;    
}
</style>