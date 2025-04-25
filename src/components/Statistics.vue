<template>
    <div class="title">
        Statystyki 
    </div>
</template>

<script>
export default {
    name: 'Statistics',
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
  mounted() {
    
    this.loadBooks();
  }

}
}
</script>

<style>

</style>