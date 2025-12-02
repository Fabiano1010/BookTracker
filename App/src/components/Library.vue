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
            <textarea name="opinion" id="opinion" class="txtArea inputEditTxtArea" rows="5" cols="20" placeholder="Opinion" v-model="editBook.opinion" > </textarea>
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

</style>