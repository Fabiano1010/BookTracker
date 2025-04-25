<template>
    <div class="title">
        Biblioteka
    </div>
    <div class="">
        <!-- <button @click="loadBooks" class="btn">Wczytaj biblioteke</button> -->
        <div class="errors">
            <p v-if="error">{{ error }}</p>
            <p v-if="!error && books.length===0">Brak zapisanych książek</p>
        </div>
        <div class="library">
            <div v-for="(book,index) in books" :key="index" class="book-card">
                <h3>{{ book.title }}</h3>
                <!-- <div v-if="!book.authors && book.authors.length > 0" class="author">
                    Autorzy: {{ book.authors.join(', ') }}
                </div> -->
                <div v-if="book.rating" class="rating">
                    Ocena: {{ book.rating }}/5
                </div>
                <div class="buttonDiv">
                    <button class="btn libBtn" @click="details()">Szczegóły</button>
                    <button class="btn btnClear libBtn" @click="deleteBook()">Usuń</button>
                </div>
                
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
      error: null 
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

    }
  },
  mounted() {
    
    this.loadBooks();
  }

}
</script>

<style>
.title{
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 3px;
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
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
    height: 65vh;
    width: 90vw;
    align-items: center;
    overflow-x: auto;
    padding: 5vw;
}
.book-card{
    border-radius: 10px;
    border: 1px solid white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 13vw;
    height: 13vh;
    background: linear-gradient(rgba(56, 56, 56, 0.8), rgba(37, 37, 37, 0.808));
    transition: 0.5s;
    box-shadow: 3px 3px 20px black;
    margin: 15px;
}
.book-card:hover{
    transform: scale(1.1);
    box-shadow: 10px 10px 25px black;
}
.libBtn{
    width: 100px;
}
.buttonDiv{
    width: 100%;
    display: flex;
    justify-content: space-around;
}

</style>