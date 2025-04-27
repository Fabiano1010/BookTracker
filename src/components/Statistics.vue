<template>
    <div class="title">
        Statystyki 
    </div>
    <div class="stats">
      <div class="mostLikedGenry stat">
        <div class="statsText">Ulubiony gatunek</div>
        <div class="mostLikedGenryStat statData">{{ this.mostLikedGenry }}</div>
      </div>
      <div class="bookCounter stat">
        <div class="statsText">Przeczytane</div>
        <div class="averageReadStat statData">{{ this.averageReadBooks }}/{{ this.books.length }}</div>
      </div>
      <div class="averageRating stat">
        <div class="statsText">Średnia ocena</div>
        <div class="averageRatingStat statData">{{ this.averageRating }}/{{ 5 }}</div>
      </div>
      <div class="averageTime stat">
        <div class="statsText">Średni czas czytania</div>
        <div class="averageTimeStat statData">{{ this.averageReadTime }}/{{ this.maxReadTime }}</div>
      </div>
      <div class="averageRead stat">
        <div class="statsText">Zsumowany czas czytania</div>
        <div class="sumTimeStat statData">{{ this.sumReadTime }} h</div>
      </div>
      <div class="opinionCount stat">
        <div class="statsText">Napisane opinie</div>
        <div class="opinionCountStat statData">{{ this.opinionCount }}/{{ this.books.length }}</div>
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
    }
  },
  methods: {
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
     
      for(let i =0;i<this.books.length;i++){
        
        if(this.books[i].isread) counter++;
      }
      this.averageReadBooks=counter;
    },
    avgTime(){
      let sum=0;
      for(let i =0;i<this.books.length;i++){
        sum+=parseInt(this.books[i].time);
       
      }
      if(this.books.length!==0) this.averageReadTime=Math.ceil(sum/this.books.length);
    },
    avgRating(){
      let sum=0;
      for(let i = 0;i<this.books.length;i++){
        sum+=parseInt(this.books[i].rating);
        
      }
      if(this.books.length!==0) this.averageRating=parseFloat((sum/this.books.length).toFixed(1));;
    },
    maxTime(){
      let max=0;
      for(let i =0;i<this.books.length;i++){
        if(max<parseInt(this.books[i].time)) max=parseInt(this.books[i].time);
      }
      this.maxReadTime=max;
    },
    
    opinionCounter(){
      let counter=0;
      for(let i =0;i<this.books.length;i++){
        if(this.books[i].opinion) counter++;
      }
      this.opinionCount=counter
    },
    sumTime(){
      let sum=0;
      for(let i = 0;i<this.books.length;i++){
        sum+=parseInt(this.books[i].time);
      }
      
      this.sumReadTime=sum;
    },
    creatStats() {
      this.opinionCounter();
      this.maxTime();
      this.avgRating();
      this.avgTime();
      this.avgRead();
      this.favGenry();
      this.sumTime();
    }
  
  
    
  },

  mounted() {
    
    this.loadBooks();
    this.creatStats();
  }

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
  height: 80vh;
  margin-top: 10px;
}
.statsText{
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: center;
}
.stat{
  width: 28vw;
  height: 38vh;
  padding: 5px;
}
.statData{
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>