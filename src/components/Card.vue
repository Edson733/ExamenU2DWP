<template>
    <b-container fluid>
        <b-row>
            <b-col v-for="book in books" :key="index" cols="2" sm="12" md="2" lg="2">
                <div v-if="books.length === 0" class="col-12 text-center">
                    <p>No hay registros disponibles.</p>
                </div>
                <div>
                    <b-card draggable="true" @dragstart="handleDragStart(book, $event)" :title="book.name" img-src="https://www.enago.com/academy/wp-content/uploads/2021/12/BookChapter-750x340.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="card rounded shadow mb-2">
                        <b-card-text>
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
                        <div class="box1 rounded shadow" @dragover.prevent @drop="handleEdit">
                            <b-icon class="icon" icon="pencil" aria-hidden="true"></b-icon>
                        </div>
                    </b-col>
                    <b-col cols="12" sm="12" class="mb-2">
                        <div class="box2 rounded shadow" @dragover.prevent @drop="handleDelete">
                            <b-icon class="icon" icon="trash-fill" aria-hidden="true"></b-icon>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <EditModal :book="draggedBook"/>
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
            handleDragStart(book, event) {
                this.draggedBook = book;
                event.dataTransfer.setData('text/plain', book.title);
            },
            async handleDelete(event){
                event.preventDefault();
                const bookId = event.dataTransfer.getData("bookId");
                const bookToDelete = this.books.find(book => book.id === bookId) || this.draggedBook;
                if (bookToDelete) {
                    console.log(bookToDelete.id);
                    const data = await services.deleteBook(bookToDelete.id);
                    if (data) {
                        await this.getAllBooks();
                    }
                }
            },
            handleEdit(event) {
                event.preventDefault();
                const bookId = event.dataTransfer.getData("bookId");
                const bookToEdit = this.books.find(book => book.id === bookId) || this.draggedBook;
                if (bookToEdit) {
                    this.openEditModal(bookToEdit);
                }
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
            openEditModal(book) {
                this.$bvModal.show('EditModal');
            }
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