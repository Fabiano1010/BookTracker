<script setup>

</script>
<template>
    <div class="title">
        Add book
    </div>
    <div class="bookQueryDiv">
        <div  class="booksQuery">
          <div class="glass">
            <img src="../assets/glass.svg"  alt="" @click="searchBooks"><input v-model="searchQuery" @input="searchBooks" placeholder="Search books..." class="searchInput" >
          </div>      
          <div class="books">
            <div v-if="loading" class="loading">Loading...</div>
            <div v-else>
              <div class="book" v-for="book in addedBooks" :key="book.id">
                <h3>{{ book.volumeInfo.title }}</h3>
                <p v-if="book.volumeInfo.authors">Author: {{ book.volumeInfo.authors.join(', ') }}</p>
                
                <button class="btn" @click="addBook(book.volumeInfo.title, book.volumeInfo.authors ? book.volumeInfo.authors : ['Unknown Author'])">Choose</button>
              </div>
            </div>
          </div>  
        </div>
      
      
        <form action="" class="bookForm" @submit.prevent="saveBook">
          <div class="choosenBookDisplay" id="choosenBookDisplay">{{ newBook.title }}</div>
          <input type="text" id="choosenBook" name="choosenBook" v-model="newBook.title" hidden>
          <input type="text" id="choosenBookAuthor" name="choosenBookAuthor" v-model="newBook.authors" hidden>
          <div class="checkboxDiv"><input type="checkbox" name="isRead" id="isRead" v-model="newBook.isread"> Book finished</div>
          <div class="readingTimeDiv">
            <label for="readingTime">Reading time:</label><br>
            <input type="number" name="readingTime" id="readingTime" placeholder="10" class="timeInput" min="1" max="500" step="1" v-model="newBook.time" required> h
          </div>
          <div>
            <label for="rating">Rating:</label>
              <div class="ratingRadio">
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="1" v-model="newBook.rating" required>
                  <span>1</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="2" v-model="newBook.rating" required>
                  <span>2</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="3" v-model="newBook.rating" required>
                  <span>3</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="4" v-model="newBook.rating" required>
                  <span>4</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="5" v-model="newBook.rating" required>
                  <span>5</span>
                </div>
              </div>
            </div>
          <div class="selectDiv">
            <label for="genry">Most suitable genry: </label>
            <select name="genry" id="genry" v-model="newBook.genry" required>
              <option value="none">--choose genry--</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantasy</option>
              <option value="scify">Scify</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="fiction">Fiction</option>
              <option value="biography">Biography</option>
              <option value="adventure">Adventure</option>
              <option value="travel">Travel</option>
              <option value="nonfiction">Non-ficion</option>

            </select>
          </div>
          <div class="txtAreaDiv">
            <textarea name="opinion" id="opinion" class="txtArea" rows="5" cols="20" placeholder="Opinion" v-model="newBook.opinion" ></textarea>
          </div>
        <div class="formBtns">
          <button class="btn btnClear" type="reset" @click="clearbook()">Clear</button>
          <button class="btn btnSave" type="submit">Save</button>
        </div>
      </form>
    </div>
    <transition name="fade">
      <div class="saved" v-if="showAlert">
        {{ saved }}
      </div>
    </transition>
  </template>
  
  <script>
  import booksApi from '../services/booksApi';
  import { debounce } from 'lodash';
  export default {
    name: 'Add',
    
    data() {
      return {
        searchQuery: '',
        addedBooks: [],
        loading: false,
        saved: '',
        showAlert: false,
        timeoutId: null,
        newBook: {
            title: '',
            authors: '',
            isread: false,
            time: '',
            rating: '',
            genry: '',
            opinion: '' 
        },
        library:{
          bookslib:[]
        },
        created() {
          this.loadFromLocalStorage();
        },
      };
    },
    methods: {
      async searchBooks() {
        if (!this.searchQuery.trim()) {
          this.addedBooks = [];
          return;
        }
        
        this.loading = true;
        this.error = null;
        
        try {
          const response = await booksApi.searchBooks(this.searchQuery);
          this.addedBooks = response.items || [];
        } catch (err) {
          this.error = 'An error occured while searching books.';
          this.addedBooks = [];
        } finally {
          this.loading = false;
        }
      },
  

      addBook(book, authors){
        this.newBook.title = book;
        
        this.newBook.authors = authors;
        
        
      },
      clearbook(){
        this.choosenBook = '';
      },
      saveBook(){
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        if(!this.newBook.title){
          this.showAlert=true;
          this.saved="Add book!"
          this.timeoutId = setTimeout(() => {
            this.showAlert = false;
          }, 2000);
          return;
        }
        
        const storedData = localStorage.getItem('bookLibrary');
        if (storedData !== null) {
          this.library = JSON.parse(storedData);
        }
        
        this.library.bookslib.push(this.newBook);
    
        localStorage.setItem('bookLibrary', JSON.stringify(this.library));
       
        this.showAlert=true;
        this.saved ="Saved!"
        this.timeoutId = setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        
      },  
      debouncedSearch: debounce(function() {
      this.searchBooks();
      }, 500),
   

    }
  };
  
  </script>
  <style>

  </style>
