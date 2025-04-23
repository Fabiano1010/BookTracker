<template>
    <div>
      <form action="post" class="bookForm">
      <input v-model="searchQuery" @input="searchBooks" placeholder="Wyszukaj książki...">
      <button @click="searchBooks">Szukaj</button>
      
      <div v-if="loading">Ładowanie...</div>
      <div v-else class="books">
        <ul>
          <li v-for="book in books" :key="book.id">
            <h3>{{ book.volumeInfo.title }}</h3>
            <p v-if="book.volumeInfo.authors">Autor: {{ book.volumeInfo.authors.join(', ') }}</p>
            <button >Dodaj</button>
          </li>
        </ul>
      </div>
    </form>
    </div>
    
  </template>
  
  <script>
  // import booksApi from '../services/booksApi';
  
  export default {
    name: 'Add',
    data() {
      return {
        searchQuery: '',
        books: [],
        loading: false
      };
    },
    methods: {
      async searchBooks() {
        if (this.searchQuery.trim() === '') return;
        
        this.loading = true;
        try {
          const response = await booksApi.searchBooks(this.searchQuery);
          this.books = response.data.items || [];
        } catch (error) {
          console.error('Błąd podczas wyszukiwania książek:', error);
        } finally {
          this.loading = false;
        }
      },
      async addBook(){

      }
    }
  };
  </script>
  <style>
    .bookFrom{
      width: 50vw;
      text-wrap: wrap;
      color: black;
    }
  </style>