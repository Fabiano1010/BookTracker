<template>
    <div>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          ref="progressCircle"
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#42b983"
          stroke-width="10"
          stroke-dasharray="502.4"
          :style="{ strokeDashoffset: animatedOffset }"
          />
      </svg>
      
      <button @click="animateProgress(75)">Animate to 75%</button>
      <button @click="animateProgress(100)">Animate to 100%</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        animatedOffset: 502.4, // Początkowa wartość (100% offset - 0% progress)
        animationFrameId: null
      }
    },
    methods: {
      animateProgress(targetPercent) {
        
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        
        const duration = 1000; // 1 sekunda
        const startTime = performance.now();
        const startOffset = this.animatedOffset;
        const targetOffset = 502.4 * (1 - targetPercent / 100);
        
        const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Funkcja easing (możesz użyć różnych)
          const easedProgress = this.easeOutQuad(progress);
          
          this.animatedOffset = startOffset + (targetOffset - startOffset) * easedProgress;
          
          if (progress < 1) {
            this.animationFrameId = requestAnimationFrame(animate);
          } else {
            this.animationFrameId = null;
          }
        };
        
        this.animationFrameId = requestAnimationFrame(animate);
      },
      easeOutQuad(t) {
        return t * (2 - t);
      }
    },
    beforeDestroy() {
      // Sprzątanie - zatrzymanie animacji przy usuwaniu komponentu
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }
  }
  </script>