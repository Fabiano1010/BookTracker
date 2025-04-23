<script setup>

import { ref } from 'vue'

</script>

<template>
  <div class="container">
   <nav class="navigation">
      <div class="menu">
        <div class="nav-logo"><img class="icon" src="./assets/icon.svg" alt="">BookTracker</div>
        <div class="nav-link" @click="activeComponent = 'Home'" >Home</div>
        <div class="nav-link" @click="activeComponent = 'Library'" >Biblioteka</div>
        <div class="nav-link" @click="activeComponent = 'Statistics'">Statystyki</div>
        <div class="nav-link" @click="activeComponent = 'Add'">Dodaj</div> 

      </div>
     
    </nav>
    
    <div class="content">
   
        
        <!-- <transition mode="out-in"> -->
         <component :is="activeComponent" class="animated-component"/>
        <!-- </transition> -->


    </div>
    <Footer />
  </div>
</template>

<script>


import Footer from './components/Footer.vue'
import Home from './components/Home.vue'
import Add from './components/Add.vue'
import Library from './components/Library.vue'
import Statistics from './components/Statistics.vue'
export default {
  name: 'App',
  components: {
 
    Footer,
    Add,
    Home,
    Library,
    Statistics,
  },
  data() {
    return {
      activeComponent: 'Home'
    }
  },

}

</script>

<style>


.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    
    align-items: center;

    }

  .content{
    height: 90vh;
  }
  

.navigation {
    display: flex;
    height: 10vh;
    align-items: center;
    justify-content: center;
  }

.menu{
  height: 50%;
  background-color: #000000;
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60vw;
  user-select: none;

}
.nav-link,.nav-logo{
  font-size: 1rem;
  text-decoration: none;
  width: 25%;
  padding: 5px;
  text-align: center;
  color: #ffffff;
  transition: ease-in-out 0.2s;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
.nav-logo{
  text-transform: unset;
}
.nav-link:hover {
  color: rgb(168, 0, 81);
  background-color: #2b2b2bdd;
  cursor: pointer;
  
}
.nav-link:nth-child(1){
  border-radius: 10px 0 0 10px;
}
.nav-link:nth-child(5){
  border-radius: 0 10px 10px 0;
}
.router-link-active {
  font-weight: bold;
  color: #42b983;
}
.icon{
  height: 2rem;
  margin-right: 5px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}



</style>