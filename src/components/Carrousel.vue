<template>
  <div>
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333">
      <template v-for="book in books">
        <b-carousel-slide :img-src="book.imagen" :caption="book.name" :img-alt="book.name">
          <p>{{ book.autor }}</p>
        </b-carousel-slide>
      </template>
      <b-carousel-slide v-if="books.length === 0" caption="Blank Image" img-blank img-alt="Blank image">
        <p>NO HAY LIBROS</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
  
<script>
  import Vue from 'vue';
  import services from '../services/services';
  
  export default Vue.extend({
    data() {
      return {
        slide: 0,
        books: [],
      };
    },
    methods: {
      async getBooks() {
        const response = await services.getBooks();
        console.log("books",response);
        this.books = [...response];
      },
    },
    mounted() {
      this.getBooks();
    },
  });
</script>
  
<style></style> 