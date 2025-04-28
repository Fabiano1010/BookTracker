<template>
    <div class="home">
        <h1>
           Witaj w BookTracker  
        </h1>
        <img src="../assets/icon.svg" alt="" width="60">
        
    </div>
    <div class="list">
        <ul>
            <li>Wyszukaj ulubione książki</li>
            <li>Oceń i napisz opinie</li>
            <li>Sprawdź ile czytasz</li>
            <li>Zobacz swoje statystyki</li>
        </ul>
    </div>
    <div class="loopBook">
    <!-- <transition name="fade">     -->
        
        <!-- <div v-if="books"><div class="loopTitle">{{ this.randomBook.title }}</div>
            
            <div class="ratingStars">
                <div v-for="star in parseInt(this.randomBook.rating)">
                    <img src="../assets/star-full.svg" class="stars">
                </div>
                <div v-for="star in (5-parseInt(this.randomBook.rating))">
                    <img src="../assets/star-empty.svg" class="stars">
                </div>
            </div>
            <div class="loopOpinion">
                {{ this.randomBook.opnion }}
            </div>
            
         </div> -->
    <!-- </transition> -->
    </div>

</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            books: [], 
            error: null,
            randomBook:{
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
        getRandomBook(){
            let next=0;
            
            
            if(this.books){
                
                this.randomBook.title=this.books[next].title
                if(!this.books[next].opnion){
                    this.randomBook.opnion="Brak opinii"
                }else{
                    this.randomBook.opnion=this.books[next].opnion
                }
            
            this.randomBook.rating=this.books[next].rating
                setInterval(() => {
                    // console.log(next)
                    next++;
                    if(next==this.books.length) next=0;
                    this.randomBook.title=this.books[next].title
                    if(!this.books[next].opnion){
                        this.randomBook.opnion="Brak opinii"
                    }else{
                        this.randomBook.opnion=this.books[next].opnion
                    }
                  
                    this.randomBook.rating=this.books[next].rating
                       
                }, 10000);
    
            }
        },
       

    },
    mounted() { 
        this.loadBooks();
        this.getRandomBook();
  }
}
</script>

<style>
    .home{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .list{
        padding: 10px;
        border-radius: 10px;
        border: solid rgba(0, 0, 0, 0.534) 1px;
        background-color: rgba(0, 0, 0, 0.363);
        height: 25vh;
        margin-top: 5vh;
    }
    .list ul{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        margin: 0;
    }
    .list ul li{
        
        font-size: 1.2rem;

    }
    .loopBook{
        display: flex;
        width: 20vw;
        height: 30vh;
        flex-direction: column;
        margin-top: 1vh;

    }
    .loopTitle{
        size: 1.2rem;
        text-transform: uppercase;
    }
    @media only screen and (min-width:480px) and (max-width:900px){
        .list{
            margin: auto;
            width: 60%;
        }


    }
    @media only screen and (max-width:480px){
        /* .navigation{
            margin-bottom: 2vh;
        } */
    }
</style>