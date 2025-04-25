<template>
    <div class="home">
        <h1>
           Witaj w BookTracker  
        </h1>
        <img src="../assets/icon.svg" alt="" width="60">
        
    </div>
    <div class="list">
        <ul>
            <li>Wyszukaj ulubione książki</li>
            <li>Oceń i napisz opinie</li>
            <li>Sprawdź ile czytasz</li>
            <li>Zobacz swoje statyskki</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
    .home{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .list{
        padding: 10px;
        border-radius: 10px;
        border: solid rgba(0, 0, 0, 0.534) 1px;
        background-color: rgba(0, 0, 0, 0.363);
        height: 25vh;
        margin-top: 5vh;
    }
    .list ul{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        margin: 0;
    }
    .list ul li{
        
        font-size: 1.2rem;

    }
</style>