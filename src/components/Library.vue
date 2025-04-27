<template>
  <!-- titile secton -->
    <div class="title">
        Biblioteka 
    </div>
    <div v-if="books.length>0 || error" class="bookCount">Zapisane ksiązki: <b>{{ books.length }}</b>
      <button class="btn btnClear" @click="showClearPopup=!showClearPopup">Wyczyść</button>
    </div>
    <!-- popup section -->
     <!-- clear library popup -->
    <transition name="fade">
      <div class="clearPopup" v-if="showClearPopup"> 
          <p>Czy na pewno chcesz usunąć CAŁĄ bibliotekę?</p>
          <div>
            <button class="btn btnClear" @click="clearLib();">TAK</button>
            <button class="btn btnSave" @click="showClearPopup=!showClearPopup">NIE</button>
          </div>
      </div>
    </transition>
    <!-- book popup -->
    <Transition name="fade">
      <div v-if="showBookPopup" class="bookPopup">
        <div class="popupContent">
          <div class="popupLeft"> 
            <div class="bookPopupTitle">
              {{ this.popupTitle }}
            </div>
            <div class="bookAuthors">
              Autorzy:<p>{{ this.popupAuthors.join(', ') }}</p>
            </div>
            <div class="bookGenry">
              {{ this.popupGenry }}
            </div>  
          </div>  
          <div class="popupRight">
            <div class="bookIsread" v-if="this.popupIsread">
              Książka przeczytana
            </div>
            <div class="bookIsread" v-else>
              Książka nie przeczytana
            </div>
            <div class="bookTime">
              Czas czytania <p>{{ this.popupTime }}h</p>
            </div>
            <div class="bookOpinion">
              {{ this.popupOpinion }}
            </div>
            <div class="bookRating">
              <div v-for="star in parseInt(this.popupRating )"><img src="../assets/star-full.svg" class="stars"></div>
              <div v-for="star in (5-parseInt(this.popupRating ))"><img src="../assets/star-empty.svg" class="stars"></div>
            </div>
          </div>
        </div>
      <div class="bookPopupButtons">
        <button class="btn btnClear" @click="showBookPopup=!showBookPopup">Zamknij</button>
        <button class="btn btnSave" @click="showEditPopup=!showEditPopup">Edytuj</button>
        <button class="btn btnClear" @click="deleteBookPopup=!deleteBookPopup">Usuń</button>
      </div>
      <!-- book delete popup -->
      <div class="clearPopup" v-if="deleteBookPopup"> 
        <p>Czy na pewno chcesz usunąć książkę?</p>
        <div>
          <button class="btn btnClear" @click="deleteBook(this.title, this.bookId)">TAK</button>
          <button class="btn btnSave" @click="deleteBookPopup=!deleteBookPopup">NIE</button>
        </div>
       </div>
      </div>
    </Transition>
    <!-- div to show books section -->
    <div class="library" >
      <!-- error show section -->
      <div class="errors">
        <p v-if="error">{{ error }}</p>
        <p v-if="!error && books.length===0">Brak zapisanych książek</p>
        <p v-if="deleted">Usunięto książki</p>  
      </div>
      <!-- loop for book display -->
      <div v-for="(book,index) in books" :key="index" class="book-card-outer" v-if="!deleted">
        <div class="book-card">
          <div class="book-cover" @click="details(book, index)">
            <div class="bookContent">
              <div class="bookTitle">
                  {{ book.title }}        
              </div>
              <div class="rating" v-if="book.rating" >
                <div>Ocena:</div>
                <div class="ratingStars">
                  <div v-for="star in parseInt(book.rating)">
                    <img src="../assets/star-full.svg" class="stars">
                  </div>
                  <div v-for="star in (5-parseInt(book.rating))">
                    <img src="../assets/star-empty.svg" class="stars">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="light"></div>
          <div class="book-inside"></div>
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
      showClearPopup: false,
      deleteBookPopup: false,
      popupTitle:'',
      popupAuthors: [],
      popupGenry:'',
      popupRating:'',
      popupIsread:'',
      popupOpinion:'',
      popupTime: '',
      showBookPopup: false,
      deleted: false,
      bookId:'',
      showEditPopup: false,
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
    deleteBook(bookTitle, bookId){
      const storedData = localStorage.getItem('bookLibrary');
      console.log(storedData)
      const library = JSON.parse(storedData);
      
      this.books.splice(bookId, 1)
      
      library.bookslib=this.books;
      // console.log(JSON.stringify(library))
      localStorage.setItem('bookLibrary',JSON.stringify(library));
      
      this.deleteBookPopup=!this.deleteBookPopup
      this.showBookPopup=!this.showBookPopup
      
    },
    edit(){

    },

    details(book, index){
      
      this.popupTitle=book.title;
     
      this.popupAuthors=book.authors;
      this.bookId=index;
      switch(book.genry) {
        case "crime":
          this.popupGenry="Kryminał";
          break;
        case "fantasy":
          this.popupGenry="Fantasy";
          break;
        case "scify":
          this.popupGenry="Scify";
          break;
        case "romance":
          this.popupGenry="Romans";
          break;
        case "thriller":
          this.popupGenry="Thriller";
          break;
        case "horror":
          this.popupGenry="Horror";
          break;
        case "fiction":
          this.popupGenry="Literatura obyczajowa";
          break;
        case "biography":
          this.popupGenry="Biografia";
          break;
        case "adventure":
          this.popupGenry="Przygodowa";
          break;
        case "travel":
          this.popupGenry="Podróżnicza";
          break;
        case "nonfiction":
          this.popupGenry="Lieratura faktu";
          break;
        default:
          this.popupGenry="Gatunek niedopasowany";
          break;
      }

      this.popupRating=book.rating;
      book.isread ? this.popupIsread=true : this.popupIsread=false;

      this.popupOpinion=book.opinion;
      this.popupTime=book.time;
      this.showBookPopup=true;
      
    },
    clearLib(){
      localStorage.clear();
      this.showClearPopup=!this.showClearPopup
      this.deleted=true;

    }
  },
  mounted() {
    
    this.loadBooks();
  }

}
</script>

<style>
.bookCount{
  size: 1.1rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bookCount button{
  margin-left: 20px;
}
.bookPopupButtons{
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.bookPopupButtons button{
  font-size: 1.1rem;
}
.popupContent{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 75%;
}
.popupLeft, .popupRight{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding: 10px;
}
.popupRight{
  text-align: right;
  align-items: flex-end;
}
.popupLeft{
  text-align: left;
  align-items: flex-start;
}
.bookPopupTitle{
  font-size: 2rem;
  font-weight: 700;
  text-transform: capitalize;
  text-wrap: wrap;
}
.bookAuthors{
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: capitalize;
  text-wrap: wrap;
  
}
.bookGenry{
  font-size: 1.25rem;
}
.bookTime{
  font-size: 1.4rem;
}

.bookRating{
  display: flex;
  flex-direction: row;
}
.bookRating img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.bookIsread{
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
  text-wrap: wrap;
  text-align: right;
  text-decoration: underline;
}
.bookOpinion{
  text-align: justify;
  overflow: auto;
  width: 95%;
  height: 60%;
}
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
.clearPopup p{
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  
}
.clearPopup button{
  border: 1px solid white;
  margin-right: 10px;
}
.rating{
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
  }
  .ratingStars{
    margin-top: 5px;
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
  margin-right: 10px;
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
  
}
.library{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    height: 66vh;
    width: 95vw;
    align-items: center;
    overflow-x: auto;
    padding: 0 3vw 9vh 3vw;
    z-index: 0;
    margin-bottom: 1vh;
}

.libBtn{
    width: 100px;
}
.buttonDiv{
    width: 100%;
    display: flex;
    justify-content: space-around;
}




.book-card {
  width: 130px;
  height: 160px;
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
.bookPopup{
	
	background: url("https://i.imgur.com/0kjMcUe.png");
	background-size: 1000px;
	background-position: center right;
	padding: 30px 80px 50px 80px;
	z-index: 1002;
	filter: brightness(0.95) sepia(30%) saturate(80%);
	border-radius: 30px;
	
	clip-path: polygon(
		0% 0%,
		0% 93%,
		5% 98%,
		6% 99%,
		8% 95%,
		12% 94%,
		15% 97%,
		17% 93%,
		20% 98%,
		22% 97%,
		25% 99%,
		31% 94%,
		35% 93%,
		39% 96%,
		43% 93%,
		45% 94%,
		47% 95%,
		50% 92%,
		52% 96%,
		54% 93%,
		58% 92%,
		60% 95%,
		62% 93%,
		65% 96%,
		69% 93%,
		72% 93%,
		75% 94%,
		79% 97%,
		81% 94%,
		85% 93%,
		88% 92%,
		90% 95%,
		93% 93%,
		95% 92%,
		97% 95%,
		100% 97%,
		100% 0%
	);
	overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  padding: 10px;
  border: 1px solid rgb(255, 255, 255);
  width: 60vw;
  height: 70vh;
  margin: auto;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.722);
  margin-top: 10px;
  text-align: center;
  position: fixed;
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%, 0);
  color: #000;
}


</style>