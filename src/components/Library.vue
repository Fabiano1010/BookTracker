<template>
    <div class="title">
        Biblioteka 
        <button class="btn btnClear" @click="showCleraPopup=!showCleraPopup">Wyczyść</button>
    </div>
      <transition name="fade">
      <div class="clearPopup" v-if="showCleraPopup"> 
          <p>Czy na pewno chcesz usunąć CAŁĄ bibliotekę?</p>
          <div>
            <button class="btn btnClear" @click="clearLib();">TAK</button>
            <button class="btn btnSave" @click="showCleraPopup=!showCleraPopup">NIE</button>
          </div>
      </div>
      </transition>
        
        <!-- <button @click="loadBooks" class="btn">Wczytaj biblioteke</button> -->
        <div class="errors">
            <p v-if="error">{{ error }}</p>
            <p v-if="!error && books.length===0">Brak zapisanych książek</p>
        </div>
        <div class="library">
            <div v-for="(book,index) in books" :key="index" class="book-card-outer">
              <div class="book-card">
                <!-- <div v-if="!book.authors && book.authors.length > 0" class="author">
                    Autorzy: {{ book.authors.join(', ') }}
                </div> -->
                <div class="book-cover" @click="details()">
                  <div class="bookContent">
                    <div class="bookTitle">
                        {{ book.title }}
                    </div>
                    <div class="rating" v-if="book.rating" >
                      <div v-for="star in parseInt(book.rating)"><img src="../assets/star-full.svg" class="stars"></div>
                      <div v-for="star in (5-parseInt(book.rating))"><img src="../assets/star-empty.svg" class="stars"></div>
                        <!-- Ocena: {{ book.rating }}/5 -->
                    </div>
                  </div>
                  <!-- <div class="effect">
                  </div> -->
                </div>
                <div class="light"></div>
                <div class="book-inside">
                  
                </div>

              </div>

                <div class="buttonDiv">
                    <button class="btn libBtn" @click="details()">Szczegóły</button>
                    <button class="btn btnClear libBtn" @click="deleteBook()">Usuń</button>
                </div>
                
            </div>
        </div>
    

</template>

<script>
import booksApi from '@/services/booksApi';

export default {
    name: 'Library',

    data() {
    return {
      books: [], 
      error: null, 
      showCleraPopup: false,
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
    deleteBook(){

    },
    details(){
      
    },
    clearLib(){

    }
  },
  mounted() {
    
    this.loadBooks();
  }

}
</script>

<style>
.clearPopup{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  padding: 10px;
  border: 1px solid rgb(255, 255, 255);
  width: 20vw;
  margin: auto;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.722);
  margin-top: 10px;
  text-align: center;
  position: fixed;
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%, 0);
}
.clearPopup div{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

}
.clearPopup button{
  border: 1px solid white;
  margin-right: 10px;
}
  .rating{
    font-size: 0.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
.book-card-outer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title{
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 3px;
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    flex-direction: column;
}
.bookTitle{
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
}
.errors{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-top: 2vh;
}
.library{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    height: 75vh;
    width: 90vw;
    align-items: center;
    overflow-x: auto;
    padding: 0.5vh 3vw 2.5vh 3vw;
    z-index: 0;
}

.libBtn{
    width: 100px;
}
.buttonDiv{
    width: 100%;
    display: flex;
    justify-content: space-around;
}

a {
  text-decoration: none;
}


.book-card {
  width: 8vw;
  height: 20vh;
  position:relative;
  text-align: center;
  margin:2.5%;
}
.stars{
  width: 12px;
  height: 12px;
  
}

.book-cover {
  position: absolute;
  z-index:1;
  width: 100%;
  height: 100%;
  transform-origin: 0 50%;
  -webkit-transform-origin: 0 50%;
  background: #111;
  background-size:cover;
  border-radius: 3px;
  box-shadow: 
    inset 4px 1px 3px #ffffff60,
    inset 0 -1px 2px #00000080;
  transition: all .5s ease-in-out;
  -webkit-transition: all .5s ease-in-out;
}
.book-card .book-cover {
  background-size: 100% 100%;
}

.bookContent {
  width:90%;
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 2px solid #00000010;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  transition: all .5s ease;
}
.light {
  width: 90%;
  height: 100%;
  position: absolute;
  border-radius: 3px; 
  background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%);
  top: 0;
  right:0;
  opacity: .1;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
}

.book-card:hover { cursor:pointer; }

.book-card:hover .book-cover {
  transform: perspective(2000px) rotateY(-30deg);
  -webkit-transform: perspective(2000px) rotateY(-30deg);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  box-shadow: 
    inset 4px 1px 3px #ffffff60,
    inset 0 -1px 2px #00000080,
    10px 0px 10px -5px #00000030
}

.book-card:hover .effect {
  width: 40px;
 /** margin-left:13px;
  opacity: 0.5; **/
}

.book-card:hover .light {
  opacity: 1;
  width: 70%;
}

.book-inside{
  width: calc(100% - 2px);
  height:96%;
  position:relative;
  top: 2%;
  border: 1px solid grey;
  border-radius:3px;
  background: white;
  box-shadow: 
  10px 40px 40px -10px #00000030,
  inset -2px 0 0 grey,
  inset -3px 0 0 #dbdbdb,
  inset -4px 0 0 white,
  inset -5px 0 0 #dbdbdb,
  inset -6px 0 0 white,
  inset -7px 0 0 #dbdbdb,
  inset -8px 0 0 white,
  inset -9px 0 0 #dbdbdb;
}

 

.book-card:hover .btn, .book-card:hover .bookTitle {
  opacity: 1;
}

</style>