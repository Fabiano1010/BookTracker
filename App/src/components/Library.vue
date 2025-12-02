<template>
  <!-- titile secton -->
    <div class="title">
        LIBRARY
    </div>
    <div v-if="books.length>0 || error" class="bookCount">Saved books: <b>{{ books.length }}</b>
      <button class="btn btnClear" @click="showClearPopup=!showClearPopup">Clear</button>
    </div>
    <!-- popup section -->
     <!-- clear library popup -->
    <transition name="fade">
      <div class="clearPopup" v-if="showClearPopup"> 
          <p>Are you sure, you want DELETE ALL BOOKS?</p>
          <div>
            <button class="btn btnClear" @click="clearLib();">YES</button>
            <button class="btn btnSave" @click="showClearPopup=!showClearPopup">NO</button>
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
              Authors:<p>{{ this.popupAuthors.join(', ') }}</p>
            </div>
            <div class="bookGenry">
              {{ this.popupGenry }}
            </div>  
          </div>  
          <div class="popupRight">
            <div class="bookIsread" v-if="this.popupIsread">
              Book finished
            </div>
            <div class="bookIsread" v-else>
              Book not finished
            </div>
            <div class="bookTime">
              Reading time <p>{{ this.popupTime }}h</p>
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
        <button class="btn btnClear" @click="showBookPopup=!showBookPopup; showEditPopup=false">Close</button>
        <button class="btn btnSave" @click="showEditPopup=!showEditPopup">Edit</button>
        <button class="btn btnClear" @click="deleteBookPopup=!deleteBookPopup">Delete</button>
      </div>
      <!-- book delete popup -->
      <transition name="fade">
      <div class="clearPopup" v-if="deleteBookPopup"> 
        <p>Are you sure?</p>
        <div>
          <button class="btn btnClear" @click="deleteBook(this.title, this.bookId)">YES</button>
          <button class="btn btnSave" @click="deleteBookPopup=!deleteBookPopup">NO</button>
        </div>
       </div>
      </transition>

      <!-- Edit book popup -->
      <transition name="fade">
        <div class="bookEditPopup" v-if="showEditPopup">
        <form action=""  class="bookEditForm" @submit.prevent="editBookFunction(this.bookId)">
          <input type="text" id="choosenBook" name="choosenBook" v-model="editBook.title" hidden>
          <input type="text" id="choosenBookAuthor" name="choosenBookAuthor" v-model="editBook.title" hidden>
          <div><input type="checkbox" name="isRead" id="isRead" v-model="editBook.isread"> Finished</div>
          <div>
            <label for="readingTime">Reding time:</label><br>
            <input type="number" name="readingTime" id="readingTime" placeholder="10" class="timeInput inputEdit" min="1" max="500" step="1" v-model="editBook.time" required> h
          </div>
          <div>
            <label for="rating">Rating:</label>
              <div class="ratingRadio">
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="1" v-model="this.editBook.rating" required>
                  <span>1</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="2" v-model="this.editBook.rating" required>
                  <span>2</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="3" v-model="this.editBook.rating" required>
                  <span>3</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="4" v-model="this.editBook.rating" required>
                  <span>4</span>
                </div>
                <div class="ratingRadioDiv">
                  <input type="radio" name="rating" id="rating" class="rating" value="5" v-model="this.editBook.rating" required>
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
              <option value="nonfiction">Non-fiction</option>

            </select>
          </div>
          <div class="txtAreaDiv">
            <textarea name="opinion" id="opinion" class="txtArea" rows="5" cols="20" placeholder="Opinion" v-model="newBook.opinion" ></textarea>
          </div>
          <div class="editPopupButtons">
            <button class="btn btnSave inputEdit" >Save</button>
            <button class="btn inputEdit inputEdit" type="reset">Clear</button>
            <button class="btn btnClear inputEdit" @click="showEditPopup=!showEditPopup" type="reset">Cancel</button>
          </div>
        </form>
      </div>
      </transition>
    </div>
<!-- end of popup -->
    </Transition>
    <!-- div to show books section -->
    <div class="library" >
      <!-- error show section -->
      <div class="errors">
        <p v-if="error">{{ error }}</p>
        <p v-if="!error && books.length===0">No saved books</p>
        <p v-if="deleted">Books has been deleted</p>
      </div>
      <!-- loop for book display -->
      <div v-for="(book,index) in books" :key="index" class="book-card-outer" v-if="!deleted">
        <div class="book-card">
          <div class="book-cover" @click="details(book, index)">
            <div class="bookContent">
              <div class="bookTitle">
                  {{ book.title }}        
              </div>
              <div class="rating" v-if="book.rating!=''" >
                <div>Rating:</div>
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
      editBook: {
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
    }
  },
  methods: {
    loadBooks() {
      try {
        const storedData = localStorage.getItem('bookLibrary');
        if (!storedData) {
          this.error = 'No books in library';
          this.books = [];
          return;
        }
        const library = JSON.parse(storedData);
        if (!library.bookslib || !Array.isArray(library.bookslib)) {
          throw new Error('Incorrect data format');
        }
        this.books = library.bookslib;
        this.error = null;
      } catch (err) {
        console.error('Books loading error:', err);
        this.error = 'Cannot load books, check data format';
        this.books = [];
      }
    },
    deleteBook(bookTitle, bookId){
      const storedData = localStorage.getItem('bookLibrary');
      
      const library = JSON.parse(storedData);
      this.books.splice(bookId, 1)
      library.bookslib=this.books;
      
      localStorage.setItem('bookLibrary',JSON.stringify(library));
      
      this.deleteBookPopup=!this.deleteBookPopup
      this.showBookPopup=!this.showBookPopup
      
    },    
    editBookFunction(bookId){
      this.editBook.title=this.popupTitle;
      this.editBook.authors=this.popupAuthors;
      const storedData = localStorage.getItem('bookLibrary');
      
      const library = JSON.parse(storedData);
      
      this.books[bookId]=this.editBook;
      library.bookslib=this.books;
      
      localStorage.setItem('bookLibrary',JSON.stringify(library));
      
      this.details(this.books[bookId],bookId);

      // console.log(this.books[bookId].rating)

      this.showEditPopup=false;
      this.editBook.isread= false
      this.editBook.time= ''
      //this.editBook.rating=0
      this.editBook.genry= ''
      this.editBook.opinion= '' 

      // console.log(this.books[bookId].rating)

    },

    details(book, index){
      this.popupTitle=book.title;
      this.popupAuthors=book.authors;
      this.bookId=index;
      switch(book.genry) {
        case "crime":
          this.popupGenry="Crime";
          break;
        case "fantasy":
          this.popupGenry="Fantasy";
          break;
        case "scify":
          this.popupGenry="Scify";
          break;
        case "romance":
          this.popupGenry="Romance";
          break;
        case "thriller":
          this.popupGenry="Thriller";
          break;
        case "horror":
          this.popupGenry="Horror";
          break;
        case "fiction":
          this.popupGenry="Fiction";
          break;
        case "biography":
          this.popupGenry="Biography";
          break;
        case "adventure":
          this.popupGenry="Adventure";
          break;
        case "travel":
          this.popupGenry="Travel";
          break;
        case "nonfiction":
          this.popupGenry="Non-fiction";
          break;
        default:
          this.popupGenry="Unknown genry";
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
    },

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
  margin: 20px;
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
    flex-direction: row;
    justify-content: center;
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
  user-select: none;
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

.book-card:hover .book-cover,.book-card:active .book-cover {
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
.bookEditPopup{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  padding: 10px;
  border: 1px solid rgb(255, 255, 255);
  width: 40vw;
  height: 55vh;
  margin: auto;
  border-radius: 10px;
  background:linear-gradient(rgba(0, 0, 0, 0.718), rgba(0, 0, 0, 0.953)) ;
  margin-top: 10px;
  text-align: center;
  position: fixed;
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%, 0);
}
.inputEdit{
  background-color: rgba(255, 255, 255, 0.516);
  color: #000;
}
.bookEditPopup{
  color: #fff;
}
.inputEditTxtArea{
  background-color: rgba(255, 255, 255, 0.664);
  color: #000;
}
.editPopupButtons{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.bookEditForm{
  margin-top: 1vh;
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
   
    border-radius: 10px;
    padding: 1vw;
    
    width: 20vw;
    width: 20vw;
  }
.bookEditForm div{
  margin-bottom: 2vh;
}
.bookEditForm div select{
  background-color: rgba(255, 255, 255, 0.664);
  color: #000;
}
.bookEditForm div select:hover{
  background-color: rgba(255, 255, 255, 0.8);
  
}
.ratingRadioDiv{
  width: 90%;
}
.bookEditForm{
    width: 80%;
  }
.clearPopup div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.clearPopup div button{
    margin: 0;
}
@media only screen and (min-width:520px) and (max-width:900px){
  .library{
    overflow-y: auto;
    padding: 0;
  }
  .bookPopup{
    width: 90vw;
    overflow-y: auto;
  }
  .bookEditPopup{
    width: 60vw;
  }
  .bookEditForm{
    width: 80%;
  }
  .clearPopup{
    width: 50vw;
  }
  .clearPopup div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
@media only screen and (min-width:520px) and (max-width:670px){
  .bookPopup{
    width: 90vw;
    overflow-y: auto;
  }
  .bookEditPopup{
    width: 70vw;
  }
  .bookEditForm{
    width: 80%;
  }
  .clearPopup{
    width: 50vw;
  }
  .clearPopup div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .library{
    padding: 0;
    height: 80vh;

  }

}

@media only screen and (max-width:520px){
  .content{
    margin-top: -30px;
  }
  .library{
    overflow-y: auto;
    height: 300px;
    width: 90vw;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    /* padding-top: 120px; */
    /* padding-bottom: 120px; */
    /* padding-bottom: 10vh; */
  }
  .book-card-outer{
    width: 90%;
    margin: 0;
  }
  .bookPopup{
    width: 90vw;
    height: 98vh;
    overflow-y: auto;
    position: absolute;
    top:0
  }
  .bookEditPopup{
    width: 70vw;
    height: 80vh;
  }
  .bookEditForm{
    width: 90%;
  }
  .clearPopup{
    width: 70vw;
  }
  .clearPopup div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  
}
@media only screen and (orientation: landscape){
 .library{
  padding: 0;
  width: 90vw;
 }
 .btnClear{
    transform: scale(1.1);
 }
 .bookCount{
  margin-bottom: 10px;
 }
 .bookPopup{
  position: absolute;
  top:0;
  height: 90vh;
  overflow-y: auto;
 }
 .bookEditPopup{
  height: 70vh;
  position: absolute;
  top:0
 }
 .bookEditForm{
  flex-direction: row;
  flex-wrap: wrap;
  height: 90vh;
  
 }
 .btn{
  transform: scale(0.89);
 }
} 
@media only screen and (orientation: landscape) and (max-width:1080px){
  .library{
    height: 75vh;
    padding-bottom: 5vh;
  }
}
@media only screen and (orientation: landscape) and (max-width:930px){
  .library{
    height: 60vh;
    padding-bottom: 5vh;
  }
  .bookEditPopup{
  height: 80vh;
  width: 80%;
  position: absolute;
  top:0
 }
  .bookEditForm{
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  
 }
}
</style>