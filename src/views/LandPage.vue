<template>
    <b-container class="mt-3" fluid>
        <b-row class="mb-3 text-center">
            <b-col><h1>Examen U2 DWP</h1></b-col>
        </b-row>
        <b-row class="mb-3" v-show="showCarousel">
            <b-col><Carousel/></b-col>
        </b-row>
        <b-row class="mt-5 mb-3">
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksBy('autor')">Ordenar por autor</b-button>
            </b-col>
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksBy('fecha')">Ordenar por fecha</b-button>
            </b-col>
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksHasImg">Mostrar si tiene imagen</b-button>
            </b-col>
            <b-col class="text-center" cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-success" @click="addModal()"><b-icon icon="plus-circle-fill"></b-icon></b-button>
            </b-col>
        </b-row>
        <b-row>
            <Card/>
        </b-row>
        <AddModal/>
    </b-container>
</template>

<script>
    import Vue from 'vue';
    import services from '../services/services';

    export default Vue.extend({
        data() {
            return {
                slide: 0,
                showCarousel: true,
                lastScrollPosition: 0,
                books: [],
            }
        },
        components: {
            Carousel: () => import('@/components/Carrousel.vue'),
            AddModal: () => import('@/components/AddModal.vue'),
            Card: () => import('@/components/Card.vue'),
        },
        mounted() {
            this.getBooks();
            window.addEventListener("scroll", this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            handleScroll() {
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 100) {
                    return;
                }
                this.showCarrousel = currentScrollPosition < this.lastScrollPosition;
                this.lastScrollPosition = currentScrollPosition;
            },
            addModal() {
                this.$nextTick(() => {
                    this.$bvModal.show("AddModal");
                });
            },
            async getBooksBy(sort) {
                switch (sort) {
                    case 'autor':
                        const dataByAuthor = await services.getBooksByAutor(autor);
                        this.books = dataByAuthor.content;
                        break;
                    case 'fecha':
                        const dataByDate = await services.getBooksByFecha();
                        this.books = dataByDate.content;
                        break;
                }
            },
        }
    });
</script>

<style>
    .carousel-container {
        margin: 0 auto;
        max-width: 1024px;
    }
</style>