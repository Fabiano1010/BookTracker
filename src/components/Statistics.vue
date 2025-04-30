<template>
    <div class="title">
        Statystyki 
    </div>
    <div class="stats">
      <div class="mostLikedGenry stat">
        <div class="statsText">Ulubiony gatunek</div>
        <div class="mostLikedGenryStat statData">{{ this.mostLikedGenry }}</div>
      </div>
      <div class="sumRead stat">
        <div class="statsText">Zsumowany czas czytania</div>
        <div class="sumTimeStat statData">{{ !this.displaySumReadTime? 0 : this.displaySumReadTime }} h</div>
      </div>
      <div class="bookCounter stat">
        <div class="statsText">Przeczytane</div>
        <div class=" statData">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svgOuter">
            <circle class="svgCircle readCircle" id="readCircle"  :style="{ strokeDashoffset: animatedOffsetBook }"/>
          </svg>
          <div class="averageTimeStat"><div class="realStat">{{ this.displayAverageReadBooks }}/</div> <div class="maxStat">{{  !this.books.length? 0 : this.books.length }}</div></div>
        </div>
      </div>
      <div class="averageRating stat">
        <div class="statsText">Średnia ocena</div>
        <div class=" statData">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svgOuter">
            <circle class="svgCircle ratingCircle" id="ratingCircle"  :style="{ strokeDashoffset: animatedOffsetRating }"/>
          </svg>
          <div class="averageTimeStat"><div class="realStat">{{ this.displayAverageRating }}/</div> <div class="maxStat">{{ 5}}</div></div>
        </div>
      </div>
      <div class="averageTime stat">
        <div class="statsText">Średni czas czytania</div>
        <div class=" statData">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svgOuter">
            <circle class="svgCircle" id="timeCircle" :style="{ strokeDashoffset: animatedOffsetRead }"/>
          </svg>
          <div class="averageTimeStat"><div class="realStat">{{ this.displayAverageReadTime }}h/</div> <div class="maxStat">{{ this.maxReadTime }}h</div></div>

        </div>
      </div>

      <div class="opinionCount stat">
        <div class="statsText">Napisane opinie</div>
        <div class=" statData">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svgOuter">
            <circle class="svgCircle opinionCircle" id="opinionCircle"  :style="{ strokeDashoffset: animatedOffsetOpinion }"/>
          </svg>
          <div class="averageTimeStat"><div class="realStat">{{ this.displayOpinionCount }}/</div> <div class="maxStat">{{  !this.books.length? 0 : this.books.length }}</div></div>
        </div>
      </div>
      
    </div>

</template>

<script>

export default {
    name: 'Statistics',

    data() {
    return {
      books: [], 
      error: null ,
      mostLikedGenry: 'Brak ulubionego gatunku',

      maximumReadTime:0,

      averageReadTime:0,
      opinionCount:0,
      averageRating:0,
      averageReadBooks: 0,
      sumReadTime:0,

      displayAverageReadTime:0,
      displayOpinionCount:0,
      displayAverageRating:0,
      displayAverageReadBooks: 0,
      

      animatedOffsetBook: 628,
      animatedOffsetRead: 628,
      animatedOffsetOpinion: 628, 
      animatedOffsetRating: 628,
      animationFrameIds: {}
    }
  },
  methods: {
    animateProgress(targetPercent, progressBarType) {

      if (this.animationFrameIds[progressBarType]) {
        cancelAnimationFrame(this.animationFrameIds[progressBarType]);
      }
      
      const duration = 500;
      const startTime = performance.now();
      
      let startOffset, targetOffset, propertyName;
      
      switch(progressBarType) {
        case 'book':
          startOffset = this.animatedOffsetBook;
          targetOffset = 628 - (471 * targetPercent / 100);
          propertyName = 'animatedOffsetBook';
          break;
        case 'read':
          startOffset = this.animatedOffsetRead;
          targetOffset = 628 - (471 * targetPercent / 100);
          propertyName = 'animatedOffsetRead';
          break;
        case 'opinion':
          startOffset = this.animatedOffsetOpinion;
          targetOffset = 628 - (471 * targetPercent / 100);
          propertyName = 'animatedOffsetOpinion';
          break;
        case 'rating':
          startOffset = this.animatedOffsetRating;
          targetOffset = 628 - (471 * targetPercent / 100);
          propertyName = 'animatedOffsetRating';
          break;
        default:
          console.error('Nieznany typ:', progressBarType);
          return;
      }
    
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = this.easeOutQuad(progress);
        
        this[propertyName] = startOffset + (targetOffset - startOffset) * easedProgress;
        
        if (progress < 1) {
          this.animationFrameIds[progressBarType] = requestAnimationFrame(animate);
        } else {
          delete this.animationFrameIds[progressBarType];
        }
      };
    
      this.animationFrameIds[progressBarType] = requestAnimationFrame(animate);
  },
  
  easeOutQuad(t) {
    return t * (2 - t);
  },


  animateProgressReadTime(targetPrecent){
    this.animateProgress(targetPrecent, 'read');
  },
  animateProgressAvgReadBooks(targetPrecent){
    this.animateProgress(targetPrecent, 'book');
  },
  animateProgressAvgRating(targetPrecent){
    this.animateProgress(targetPrecent,'rating');
  },
  animateProgressOpinionCount(targetPrecent){
    this.animateProgress(targetPrecent, 'opinion');
},

  countStatCircles(){
    const targetPercentAvgReadTime = (this.averageReadTime/this.maxReadTime*100)
    const targetPercentAvgReadBooks  = (this.averageReadBooks/(!this.books.length? 1 : this.books.length)*100)
    const targetPercentAvgRating = (this.averageRating/5*100)
    const targetPercentOpinionCount = (this.opinionCount/(!this.books.length? 1 : this.books.length)*100)
      
    this.animateProgressReadTime(targetPercentAvgReadTime);
    this.animateProgressAvgReadBooks(targetPercentAvgReadBooks);
    this.animateProgressAvgRating (targetPercentAvgRating);
    this.animateProgressOpinionCount(targetPercentOpinionCount);
  },
  

  loadBooks() {
    try {
      
      const storedData = localStorage.getItem('bookLibrary');
      
    
      if (!storedData) {
        this.error = 'Brak zapisanych książek w bibliotece';
        this.books = [];
        return;
      }
      

      const library = JSON.parse(storedData);
      

      if (!library.bookslib || !Array.isArray(library.bookslib)) {
        throw new Error('Nieprawidłowy format danych książek');
      }
      
    
      this.books = library.bookslib;
      this.error = null;
      
    } catch (err) {
      console.error('Błąd wczytywania książek:', err);
      this.error = 'Nie udało się wczytać książek. Sprawdź format danych.';
      this.books = [];
    }
  },

  favGenry(){
    const map = {};

    
    this.books.forEach((item) => {
      const value = item.genry;
      if (value !== undefined) {
        map[value] = (map[value] || 0) + 1;
      }
      
    });

    
    let favGen;
    let maxCount = 0;

    for (const [value, count] of Object.entries(map)) {
      if (count > maxCount) {
        favGen = value;
        maxCount = count;
      }
    }  
    switch(favGen) {
      case "crime":
        favGen="Kryminał";
        break;
      case "fantasy":
        favGen="Fantasy";
        break;
      case "scify":
        favGen="Scify";
        break;
      case "romance":
        favGen="Romans";
        break;
      case "thriller":
        favGen="Thriller";
        break;
      case "horror":
        favGen="Horror";
        break;
      case "fiction":
        favGen="Literatura obyczajowa";
        break;
      case "biography":
        favGen="Biografia";
        break;
      case "adventure":
        favGen="Przygodowa";
        break;
      case "travel":
        favGen="Podróżnicza";
        break;
      case "nonfiction":
        favGen="Lieratura faktu";
        break;
      default:
        favGen="Gatunek niedopasowany";
        break;
    }
    this.mostLikedGenry=favGen;
  },
  avgRead(){
    let counter=0;
    if(this.books.length){
    for(let i =0;i<this.books.length;i++){
      
      if(this.books[i].isread) counter++;
      }
    }
    this.averageReadBooks=counter;
  },
  avgTime(){
    let sum=0;
    if(this.books.length){
      for(let i =0;i<this.books.length;i++){
        sum+=parseInt(this.books[i].time);
      }
    }
    if(this.books.length!==0) this.averageReadTime=Math.ceil(sum/this.books.length);
  },
  avgRating(){
    let sum=0;
    if(this.books.length){
    for(let i = 0;i<this.books.length;i++){
      sum+=parseInt(this.books[i].rating);
      
      }
    }
    if(this.books.length!==0) this.averageRating=parseFloat((sum/this.books.length).toFixed(1));;
  },
  maxTime(){
    let max=0;
    if(this.books.length){
      for(let i =0;i<this.books.length;i++){
        if(max<parseInt(this.books[i].time)) max=parseInt(this.books[i].time);
      }
    }
    
    this.maxReadTime=max;
  },
  
  opinionCounter(){
    let counter=0;
    if(this.books.length){
      for(let i =0;i<this.books.length;i++){
        if(this.books[i].opinion) counter++;
      }
    }
    this.opinionCount=counter
    
  },
  sumTime(){
    let sum=0;
    if(this.books.length){
      for(let i = 0;i<this.books.length;i++){
        sum+=parseInt(this.books[i].time);
      }
    }
    this.sumReadTime=sum;
    
    
  },
  countStat(){
    let tempRead = this.averageReadBooks
    let tempTime = this.averageReadTime
    let tempRating = (this.averageRating*10)
    let tempOpinion = this.opinionCount
    let tempsumReadTime = this.sumReadTime;

    this.displayAverageReadTime = 0;
    this.displayAverageRating = 0.0;
    this.displayAverageReadBooks = 0;
    this.displayOpinionCount=0;
    this.displaySumReadTime=0;

    let temp=0;
    this.sumReadTime=0;
    setInterval(()=>{
      if(this.displayAverageReadTime==tempTime){
        clearInterval();
      }else{
        this.displayAverageReadTime++;
      }
    }, 150)
    setInterval(()=>{
      if(this.displayAverageReadBooks==tempRead){
        clearInterval();
      }else{
        this.displayAverageReadBooks++;
      }
    }, 150)
    setInterval(()=>{
      if(temp==tempRating){
        clearInterval();
      }else{
        temp++;
        this.displayAverageRating=temp/10;
      }
    }, 25)

    setInterval(()=>{
      if( this.displayOpinionCount==tempOpinion){
        clearInterval();
      }else{
        this.displayOpinionCount++;
      }
    }, 150)
    setInterval(()=>{
      if(this.displaySumReadTime==tempsumReadTime){
        clearInterval();
      }else{
        this.displaySumReadTime++;
      }
    }, 1)
  },
  creatStats() {
    this.opinionCounter();
    this.maxTime();
    this.avgRating();
    this.avgTime();
    this.avgRead();
    this.favGenry();
    this.sumTime();
    this.countStat();
  },
  

    
},

  mounted() {
    
    this.loadBooks();
    this.creatStats();

    this. countStatCircles();
  },

}


</script>

<style>

.stats{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 90vw;
  height: 90vh;
  margin-top: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.statsText{
  font-size: 1.8rem;
  text-transform: uppercase;
  text-align: center;
}
.stat{
  width: 28vw;
  height: 30vh;
  padding: 5px;
}

.statData{
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 40vh;
  
}
  .svgOuter{
    width: 350px;
    height: 350px;
    transform: rotate(135deg);
  } 
  .svgCircle{
    fill: none;
    stroke: rgb(0, 154, 192);
    stroke-width: 25px;
    cx: 150px;
    cy: 200px;
    r: 100px;
    stroke-linecap:round;
    stroke-dasharray: 628; 
    stroke-dashoffset: 628;
    transition: 1.5s ease-in-out;
    filter: drop-shadow(0px 0px 10px rgb(0, 154, 192));
 
  }   

  .averageTimeStat{
    position: relative;
    z-index: 100;
    bottom: 232px;
    font-size: 2.5rem;
    display: flex;

  }
  .maxStat{
    color: #a5a5a5;
    font-size: 1.5rem;
    margin-top: 15px;
  }

  .ratingCircle{
    stroke: rgb(192, 179, 0);
    filter: drop-shadow(0px 0px 10px rgb(192, 179, 0));
  }
  .opinionCircle{
    stroke: rgb(192, 0, 58);
    filter: drop-shadow(0px 0px 10px rgb(192, 0, 58));
  }
  .readCircle{
    stroke: rgb(0, 192, 112);
    filter: drop-shadow(0px 0px 10px rgb(0, 192, 112));
  }
  .sumTimeStat{
    margin-top: -15%;
    font-size: 3rem;
    animation: forwards colors 2s;
  }
  .mostLikedGenryStat{
    margin-top: -15%;
    font-size: 0.5rem;
    animation: forwards showGen 1s;
    opacity: 0;
    text-transform: uppercase;
    letter-spacing: 5px;
    
  }
  @keyframes showGen {
    100%{
      opacity: 1;
      font-size: 2.2rem;
      color: rgb(255, 196, 0);
    }
  }
  @keyframes colors {
    100%{
      color: rgb(30, 255, 0);
    }
    75%{
      color: rgb(200, 255, 0);
    }
    50%{
      color: rgb(255, 196, 0);
    }
    25%{
      color: rgb(255, 0, 0);
      opacity: 1;
    }
    0%{
      opacity: 0;
    }
  }

  @media only screen and (min-width:520px) and (max-width:900px){
  .stats{
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-x: hidden;
    width: 95vw;
  }
  .stat{
    width: 48%;
    
  }
  .statsText{
    width: 80%;
  }
}
@media only screen and (max-width:520px){
  .stats{
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-self: center;
    align-items: center;
    margin-top: 1vh;
    width: 90vw;
    height: 70vh;
    overflow-x: hidden;
  }
  .statsText{
    width: 100%;
  }
  .stat{
    width: 80%;
    height: 300px;
  }
  .mostLikedGenryStat, .sumTimeStat{
    margin-bottom: 40px;
  }
}
@media only screen and (orientation: landscape) and (max-width:1481px) and (max-height:900px){
  .stats{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100vh;
    overflow-y: auto;
  }
  
  .stat{
    width: 48%;
    height: 300px;
  }
  .statData{
    height: 400px;
  }

} 
@media only screen and (orientation: landscape) and (max-width:1080px){
    .stats{
      overflow-y: auto;
      height: 90vh;
    }
  }

</style>