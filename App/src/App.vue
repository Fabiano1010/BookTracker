<script setup>

import { ref } from 'vue'

</script>

<template>
  <div class="container">
   <nav class="navigation">
      <div class="menu">
        <div class="nav-logo"><img class="icon" src="./assets/icon.svg" alt="">BookTracker</div>
        <div class="nav-link" @click="activeComponent = 'Home'" >Home</div>
        <div class="nav-link" @click="activeComponent = 'Library'" >Library</div>
        <div class="nav-link" @click="activeComponent = 'Statistics'">Statistics</div>
        <div class="nav-link" @click="activeComponent = 'Add'">Add Book</div>

      </div>
     
    </nav>
    
    <div class="content">

        
        <!-- <transition mode="out-in"> -->
         <component :is="activeComponent"/>
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

</style>