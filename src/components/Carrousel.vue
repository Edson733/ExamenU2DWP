<template>
    <b-container fluid>
      <b-row class="d-flex justify-content-center">
        <b-col cols="12" sm="12" md="8" lg="12">
          <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <template v-for="book in books">
                <b-carousel-slide :img-src="book.imagen" :caption="book.name" :img-alt="book.name">
                  <p>{{ book.autor }}</p>
                </b-carousel-slide>
              </template>
              <b-carousel-slide v-if="books.length === 0" caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt a tincidunt
                  eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import Vue from 'vue';
  import services from '../services/services';
  
  export default Vue.extend({
    data() {
      return {
        slide: 0,
        sliding: null,
        books: [],
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
      },
      onSlideEnd(slide) {
        this.sliding = false;
      },
    async  getBooks() {
        const response = await services.getBooks();
        console.log("books",response);
        this.books = [...response];
      },
    },
    mounted() {
      // Call getBooks when the component is mounted to fetch data
      this.getBooks();
    },
  });
  </script>
  
  <style></style>
  