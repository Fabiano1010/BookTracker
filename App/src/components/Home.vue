<template>
    <div class="home">
        <h1>
           Welcom to BookTracker
        </h1>
        <img src="../assets/icon.svg" alt="" width="60">
        
    </div>
    <div class="list">
        <ul>
            <li>Search your favorite books</li>
            <li>Rate and write opinions</li>
            <li>Check how much you read</li>
            <li>Checkout your statistics</li>
        </ul>
    </div>
    <!-- <div class="loopBook"> -->
    <!-- <transition name="fade">    
        
        <div v-if="books">
            <div class="loopTitle">{{ this.randomBook.title }}</div>
            
            <div class="ratingStars">
                <div v-for="star in parseInt(this.randomBook.rating)">
                    <img src="../assets/star-full.svg" class="stars">
                </div>
                <div v-for="star in (5-parseInt(this.randomBook.rating))">
                    <img src="../assets/star-empty.svg" class="stars">
                </div> 
            </div>
            <div class="loopOpinion">
                {{ this.nextBook.opnion }}
            </div>
            
         </div>
     </transition> --> 
    <!-- </div> -->

</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            books: [], 
            error: null,
            nextBook:{
                rating: '',
                title:'',
                opnion: ''
            },
            timeoutId: null,
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
        // getRandomBook(){
        //     let next=0;
            
            
        //     if(this.books){
                
        //         this.nextBook.title=this.books[next].title
        //         if(!this.books[next].opnion){
        //             this.nextBook.opnion="Brak opinii"
        //         }else{
        //             this.nextBook.opnion=this.books[next].opnion
        //         }
            
        //     this.nextBook.rating=this.books[next].rating
        //         setInterval(() => {
        //             // console.log(next)
        //             next++;
        //             if(next==this.books.length) next=0;
        //             this.nextBook.title=this.books[next].title
        //             if(!this.books[next].opnion){
        //                 this.nextBook.opnion="Brak opinii"
        //             }else{
        //                 this.nextBook.opnion=this.books[next].opnion
        //             }
                  
        //             this.nextBook.rating=this.books[next].rating
                       
        //         }, 1000);
    
        //     }
        // },
       

    },
    mounted() { 
        this.loadBooks();
        // this.getRandomBook();
  }
}
</script>

<style>

</style>