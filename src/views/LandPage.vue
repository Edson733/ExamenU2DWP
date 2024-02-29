<template>
    <b-container class="mt-3" fluid>
        <b-row class="mb-3 text-center">
            <b-col><h1>LandPage</h1></b-col>
        </b-row>
        <b-row v-show="showCarrousel">
            <Carousel/>
        </b-row>
        <b-row class="mt-5 mb-3">
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksOrderByAuthorDesc">Ordenar por autor</b-button>
            </b-col>
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksOrderByDateDesc">Ordenar por fecha</b-button>
            </b-col>
            <b-col cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-warning" @click="getBooksHasImg">Mostrar si tiene imagen</b-button>
            </b-col>
            <b-col class="text-center" cols="12" sm="12" md="3" lg="3" xl="3">
                <b-button variant="outline-success" @click="addModal()"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                <AddModal/>
            </b-col>
        </b-row>
        <b-row>
            <Card/>
        </b-row>
    </b-container>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                showCarrousel: true,
                lastScrollPosition: 0,
            }
        },
        components: {
            Carousel: () => import('@/components/Carrousel.vue'),
            AddModal: () => import('@/components/AddModal.vue'),
            Card: () => import('@/components/Card.vue'),
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            handleScroll() {
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                console.log(currentScrollPosition);
                if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
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
        }
    });
</script>

<style></style>