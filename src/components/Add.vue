<script setup>

</script>
<template>
    <div class="title">
        Dodaj książke 
        
    </div>
    <div class="bookQueryDiv">
        <div  class="booksQuery">
          <input v-model="searchQuery" @input="searchBooks" placeholder="Wyszukaj książki..." class="searchInput" >       
          <div class="books">
            <div v-if="loading" class="loading">Ładowanie...</div>
            <div v-else>
              <div class="book" v-for="book in addedBooks" :key="book.id">
                <h3>{{ book.volumeInfo.title }}</h3>
                <p v-if="book.volumeInfo.authors">Autor: {{ book.volumeInfo.authors.join(', ') }}</p>
                
                <button class="btn" @click="addBook(book.volumeInfo.title, book.volumeInfo.authors ? book.volumeInfo.authors : ['Autor nie znany'])">Wybierz</button>
              </div>
            </div>
          </div>  
        </div>
      
      
        <form action="" class="bookForm" @submit.prevent="saveBook">
          <div class="choosenBookDisplay" id="choosenBookDisplay">{{ newBook.title }}</div>
          <input type="text" id="choosenBook" name="choosenBook" v-model="newBook.title" hidden>
          <input type="text" id="choosenBookAuthor" name="choosenBookAuthor" v-model="newBook.authors" hidden>
          <div><input type="checkbox" name="isRead" id="isRead" v-model="newBook.isread"> przeczytana</div>
          <div>
            <label for="readingTime">Czas czytania:</label><br>
            <input type="number" name="readingTime" id="readingTime" placeholder="10" class="timeInput" min="1" max="500" step="1" v-model="newBook.time" required> h
          </div>
          <div>
            <label for="rating">Ocena:</label>
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
            <label for="genry">Najlepiej pasujący gatunek: </label>
            <select name="genry" id="genry" v-model="newBook.genry" required>
              <option value="none">--wybierz gatunek--</option>
              <option value="crime">Kryminał</option>
              <option value="fantasy">Fantasy</option>
              <option value="scify">Scify</option>
              <option value="romance">Romans</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="fiction">Literatura obyczajowa</option>
              <option value="biography">Biografia</option>
              <option value="adventure">Przygodowe</option>
              <option value="travel">Podróżnicze</option>
              <option value="nonfiction">Lieratura faktu</option>

            </select>
          </div>
          <div>
            <textarea name="opinion" id="opinion" class="txtArea" rows="5" cols="20" placeholder="Opinia" v-model="newBook.opinion" ></textarea>
          </div>
        <div class="formBtns">
          <button class="btn btnClear" type="reset" @click="clearbook()">Wyczyść</button>
          <button class="btn btnSave" type="submit">Zapisz</button>
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
        if (this.searchQuery.trim() === '') return;
        
        this.loading = true;
        try {
          
          const response = await booksApi.searchBooks(this.searchQuery);
          this.addedBooks = response.data.items || [];
        } catch (error) {
          console.error('Błąd podczas wyszukiwania:', error);
        } finally {
          this.loading = false;
        }
      },
      addBook(book, authors){
        this.newBook.title = book;
        
        this.newBook.authors = authors;
        console.log( this.newBook.authors)
        
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
          this.saved="Dodaj ksiażkę!"
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
        console.log(JSON.stringify(this.library))
        this.showAlert=true;
        this.saved ="Zapisano!"
        this.timeoutId = setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        
      },
   

    }
  };
  
  </script>
  <style>
  .bookQueryDiv{
    width: 50vw;
  }
  .bookQueryDiv{
    width: 50vw;
    display: flex;
    flex-direction: row;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
  }
  .booksQuery{
    margin-top: 0.5vh;
    margin-top: 0.5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .searchInput{
    height: 25px;
    padding: 5px;
    outline: none;
    color: white;
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    background-color: rgba(0, 0, 0, 0.363);
    font-size: 1.1rem;
    margin: 10px;
  }
  .books{
    overflow-y: auto;
    height: 51vh;
    height: 51vh;
    width: 25vw;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    background-color: rgba(0, 0, 0, 0.363);
    

  }
  .bookForm{
    margin-top: 1vh;
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    border-radius: 10px;
    padding: 1vw;
    background-color: rgba(0, 0, 0, 0.048);
    width: 20vw;
    width: 20vw;
  }
  .bookForm div{
    margin-bottom: 2vh;
  }
  .ratingRadio{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 8vw;

  }
  .book{
    border-bottom: 1px solid white;
    padding: 10px;
  }
  .btn{
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    background-color: rgba(0, 0, 0, 0.363);
    color: white;
    font-size: 1.05rem;
    outline: none;
    transition: 0.2s;
    width: 80px;
  }
  .btn:hover{
    background-color: rgba(0, 0, 0, 0.692);
    color: rgb(168, 0, 81)
  }
  .btnClear:hover{
    background-color: rgba(139, 1, 1, 0.692);
    color: white;
  }
  .btnSave:hover{
    background-color: rgba(1, 139, 31, 0.692);
    color: white;
  }
  .formBtns{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:80%;

  }
  .txtArea{
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    background-color: rgba(0, 0, 0, 0.363);
    color: white;
    font-size: 1.05rem;
    padding: 5px;
  }
  .selectDiv{
    display: flex;
    flex-direction: column;
  }
  .selectDiv select{
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.63) 1px;
    background-color: rgba(0, 0, 0, 0.63);
    color: white;
    font-size: 1.05rem;
    outline: none;
    margin-top: 5px;
  }
  .selectDiv select:hover{
    background-color: rgba(0, 0, 0, 0.842);
  }
  .timeInput{
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.63) 1px;
    background-color: rgba(0, 0, 0, 0.63);
    color: white;
    font-size: 1.05rem;
    outline: none;
    margin-top: 5px;
    
  }
  .choosenBookDisplay{
    text-wrap: wrap;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .ratingRadioDiv{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .saved{
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 4px;
    margin-top: 10px;
    transition: 0.3s ease-in-out;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-from {
    transform: scale(0.5);
    transform-origin: top left; /* Powiększanie od lewego górnego rogu */
  }
  </style>
