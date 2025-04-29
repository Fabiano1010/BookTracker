<template>
    <div class="outer-circle" id="outer-circle">
        <div class="inner-circle" id="inner-circle">
            {{ this.averageReadTime }}/{{ this.maxReadTime }}
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'ProgressBar',
    data() {
        return {
            
        }
        
    },
    methods: {
        
    },
    mounted() {
        
    },
  }
</script>
  
<style>
    .outer-circle {
        position: relative;
        height: 100px;
        width: 100px;
        border-radius: 100%;
        transform: rotate(225deg);
    }

    .inner-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        height: calc(100% - (10px * 2));
        width: calc(100% - (10px * 2));
        transform: translateX(-50%) translateY(-50%);
        border-radius: 100%;
        background: rgba(68, 68, 68, 0.329);
    }
</style>