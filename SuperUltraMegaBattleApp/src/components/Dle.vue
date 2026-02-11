<script>
    function rechercher(id){
        fetch('https://superheroapi.com/api/access-token/{{id}}/powerstats',{

        })
    }
</script>
<template>
    <h2>
        Trouve le super héros, tu as 5 essais
    </h2>
    <input type="search" v-on:change=""/>
    <button v-on:click="">Deviner</button>
</template>