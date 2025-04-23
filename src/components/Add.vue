<script setup>

</script>
<template>
    <div class="bookFormDiv">
      <div  class="booksQuery">
        <input v-model="searchQuery" @input="searchBooks" placeholder="Wyszukaj książki..." class="searchInput" >
        
        <div v-if="loading">Ładowanie...</div>
        
        <div v-else class="books">
            
              <div class="book" v-for="book in books" :key="book.id">
                <h3>{{ book.volumeInfo.title }}</h3>
                <p v-if="book.volumeInfo.authors">Autor: {{ book.volumeInfo.authors.join(', ') }}</p>
                
                <button class="btn" @click="addBook(book.volumeInfo.title)">Wybierz</button>
              </div>
            
            
        </div>
      </div>
        <form action=""class="bookForm">
          <div class="choosenBookDisplay" id="choosenBookDisplay"></div>
          <input type="text" value="" id="choosenBook" name="choosenBookDisplay" hidden>
          <div><input type="checkbox" name="isRead" id="isRead"> przeczytana</div>
          <div><label for="readingTime">Czas czytania:</label><br><input type="number" name="readingTime" id="readingTime" placeholder="10" class="timeInput" min="1" max="500" step="1"> h</div>
          <div>
            <label for="rating">Ocena:</label>
                <span class="ratingRadio">
                  <input type="radio" name="rating" id="rating" class="rating" required>
                  <input type="radio" name="rating" id="rating" class="rating" required>
                  <input type="radio" name="rating" id="rating" class="rating"required>
                  <input type="radio" name="rating" id="rating" class="rating"required>
                  <input type="radio" name="rating" id="rating" class="rating"required>
                </span>
                <span class="ratingText"><span>1</span> <span>2</span><span>3</span><span>4</span><span>5</span></span>
              
          </div>
          <div class="selectDiv">
            <label for="genry">Najlepiej pasujący gatunek: </label>
            <select name="genry" id="genry" required>
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
            <textarea name="opinion" id="opinion" class="txtArea" rows="5" cols="20" placeholder="Opinia"></textarea>
          </div>
        <div class="formBtns">
          <button class="btn btnClear" type="reset" @click="clearbook()">Wyczyść</button>
          <button class="btn btnSave">Zapisz</button>
        </div>
        </form>
      
    </div>
    
  </template>
  
  <script>
  import booksApi from '../services/booksApi';
  
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
          console.error('Błąd podczas wyszukiwania:', error);
        } finally {
          this.loading = false;
        }
      },
      async addBook(book){
          console.log(book);
          let div = document.querySelector("#choosenBookDisplay")
          div.innerHTML = book
          document.querySelector("#choosenBook").value=book;
      },
      async clearbook(){
        document.querySelector("#choosenBookDisplay").innerHTML = "";
      }
    }
  };
  
  </script>
  <style>
  .bookFormDiv{
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  .booksQuery{
    margin-top: 5vh;
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
    height: 18vh;
    width: 25vw;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    background-color: rgba(0, 0, 0, 0.363);
    

  }
  .bookForm{
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: solid rgba(0, 0, 0, 0.534) 1px;
    border-radius: 10px;
    padding: 1vw;
    background-color: rgba(0, 0, 0, 0.048);
    width:15vw;
  }
  .bookForm div{
    margin-bottom: 2vh;
  }
  .ratingRadio{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 6vw;
    margin-top: 5px;
    transition: all 0.3s ease;
  }
  .ratingText{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 6vw;
    
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
  }


  </style>