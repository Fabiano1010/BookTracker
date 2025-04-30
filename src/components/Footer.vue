<template>
    <footer class="footer">
        I1S 4.5.10 Fabian Skrzypczyński 2025 &copy;
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style>
    .footer{
        font-size: 0.8rem;
        color: gray;
        height: 3vh;
        position: absolute;
        bottom: 0;
    }
    
    @media only screen and (orientation: landscape){
      .footer{
        position: absolute;
        bottom: 5px;
      }
    }
  </style>