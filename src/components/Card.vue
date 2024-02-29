<template>
    <b-container fluid>
        <b-row>
            <b-col v-for="book in books" :key="index" cols="2" sm="12" md="2" lg="2">
                <div v-if="books.length === 0" class="col-12 text-center">
        <p>No hay registros disponibles.</p>
      </div>
                <div>
                    <b-card draggable="true" @dragover.prevent @dragenter.prevent @dragstart="handleDragStart($event, book)" title="" img-src="https://www.enago.com/academy/wp-content/uploads/2021/12/BookChapter-750x340.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="card rounded shadow mb-2 drag-el">
                        <b-card-text>
                            <b>Nombre del libro:</b> {{ book.name }}
                            <br/>
                            <b>Autor:</b> {{ book.autor }}
                            <br/>
                            <b>Año de publicación:</b> {{book.año}}
                        </b-card-text>
                    </b-card>
                </div>
            </b-col>
            <b-col cols="2" sm="12" md="2" lg="2">
                <b-row class="text-center">
                    <b-col cols="12" sm="12" class="mb-2">
                        <div class="box1 rounded shadow" @drop="onDropUpdate($event)" @dragover.prevent @dragenter.prevent>
                            <b-icon class="icon" icon="pencil" aria-hidden="true"></b-icon>
                        </div>
                        <EditModal/>
                    </b-col>
                    <b-col cols="12" sm="12" class="mb-2">
                        <div class="box2 rounded shadow" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
                            <b-icon class="icon" icon="trash-fill" aria-hidden="true"></b-icon>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Vue from "vue";
    import services from "../services/services";

    export default Vue.extend({
        data() {
            return {
                books: [],
                isLoading: true,
                selectedBook: null,
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
            handleDragStart(event, book){
                event.dataTransfer.dropEffect = "move";
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("book", book.id);
                this.selectedBook = { ...book };
            },
            onDropUpdate(book) {
                this.$nextTick(() => {
                    this.$bvModal.show("EditModal");
                });
            },
            async getAllBooks() {
                try {
                    const data = await services.getBooks();
                    this.books = [...data];
                    this.isLoading = false;
                } catch (error) {
                    console.log(error);
                }
            },
            editModal() {
                this.$nextTick(() => {
                    this.$bvModal.show("EditModal");
                });
            },
        }
    });
</script>

<style>
    .box1 {
        width: 100px;
        height: 100px;
        background-color: #3498DB;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box2 {
        width: 100px;
        height: 100px;
        background-color: #E74C3C;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        color: white;
    }

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