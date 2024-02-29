<template>
    <b-container fluid>
        <b-col cols="12" sm="12" md="10" lg="10">
            <div>
                <b-card title="Libro" img-src="https://www.enago.com/academy/wp-content/uploads/2021/12/BookChapter-750x340.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="card rounded shadow mb-2" @dragover.prevent @dragenter.prevent @dragstart="startDrag($event, book)" draggable="true">
                    <b-card-text>
                        <b>Autor:</b> Autor
                        <br/>
                        <b>Genero:</b> Genero
                        <br/>
                        <b>Año de publicación:</b> Año
                    </b-card-text>
                </b-card>
            </div>
        </b-col>
        <b-col cols="12" sm="12" md="2" lg="2">
            <b-row class="text-center">
                <b-col cols="12" sm="12" class="mb-2">
                    <b-button variant="primary" @drop="onDropUpdate($event)" @dragover.prevent @dragenter.prevent >
                        <b-icon icon="pencil" aria-hidden="true"></b-icon>
                    </b-button>
                </b-col>
                <b-col cols="12" sm="12" class="mb-2">
                    <b-button variant="danger" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
    import Vue from "vue";
    //import bookService from "../services/Book";

    export default Vue.extend({
        data() {
            return {
                books: [],
                isLoading: true,
            };
        },
        components: {
            ModalSpinner: () => import("@/components/ModalSpinner.vue"),
            EditModal: () => import("@/components/EditModal.vue"),
        },
        mounted() {
            this.getAllBooks();
        },
        methods: {
            async getAllBooks() {
                try {
                    const data = await bookService.getAllBooks();
                    this.books = [...data];
                    this.isLoading = false;
                } catch (error) {
                    console.log(error);
                }
            },
            onDropUpdate(evt) {
                this.$bvModal.show("EditModal");
            },
        }
    });
</script>

<style>
    .card {
        transition: transform 0.3s ease-in-out;
        cursor: pointer;
        animation: fade-in 0.5s ease forwards;
        opacity: 0;   
    }

    .card:hover {
        transform: scale(1.05);
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>