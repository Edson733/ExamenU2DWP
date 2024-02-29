<template>
    <div>
        <b-modal id="EditModal" @hidden="closeModal" @ok="handleOk" @cancel="closeModal" hide-header-close title="Editar" cancel-title="Cancelar" cancel-variant="outline-danger" ok-title="Editar" ok-variant="outline-success" hide-backdrop content-class="shadow">
            <b-form class="my-4" @submit.prevent="validarForm" @submit="handleSubmit">
                <p v-if="errors.length">
                    <b>{{ errors.length > 1 ? "Por favor corrige los siguientes errores: " : "Por favor corrige el siguiente error: " }}</b>
                    <ul>
                        <li v-for="error in errors" :key="error.index">{{ error }}</li>
                    </ul>
                </p>
                <b-form-group id="nombre-group" label="Nombre" label-for="nombre">
                    <b-form-input id="nombre" v-model="book.name" type="text" name="nombre" required></b-form-input>
                </b-form-group>
                <b-form-group id="autor-group" class="mt-3" label="Autor" label-for="autor">
                    <b-form-input id="autor" v-model="book.autor" type="text" name="autor" required></b-form-input>
                </b-form-group>
                <b-form-group id="category-group" class="mt-3" label="Genero" label-for="category">
                    <b-form-select id="category" v-model="book.category.id" :options="categories" value-field="id" text-field="name"/>
                </b-form-group>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion">
                    <b-form-input id="publicacion" v-model="book.año" type="number" name="publicacion" required></b-form-input>
                </b-form-group>
            </b-form>
            <ModalSpinner :isLoading="isLoading" />
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    //import bookService from "../services/Book";
    //import categoryService from "../services/Category";

    export default Vue.extend({
        components: {
            ModalSpinner: () => import("@/components/ModalSpinner.vue"),
        },
        props: {
            book: Object,
        },
        data() {
            return {
                categories: [],
                errors: [],
                isLoading: false,
            };
        },
        mounted() {
            this.getCategories();
        },
        methods: {
            async getCategories() {
                try {
                    const data = await categoryService.getCategories();
                    this.categories = [...data];
                } catch (error) {
                    console.error(error);
                }
            },
            async validarForm(e) {
                this.errors = [];

                if (!this.book.name) {
                    this.errors.push("Nombre del libro obligatorio.");
                }

                if (!this.book.autor) {
                    this.errors.push("Nombre del autor obligatorio.");
                }

                if (!this.book.category.id) {
                    this.errors.push("Genero del libro es obligatorio.");
                }

                if (!this.book.año) {
                    this.errors.push("El año de publicacion es obligatorio.");
                } else if (this.book.año < 1000 || this.book.año > new Date().getFullYear()) {
                    this.errors.push("Coloca un año de publicacion valido.");
                }

                if (!this.errors.length > 0) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
            },
            closeModal() {
                this.$bvModal.hide("EditModal");
                this.errors = [];
            },
            handleOk(bvModalEvent) {
                bvModalEvent.preventDefault();
                this.handleSubmit();
            },
            async handleSubmit() {
                this.validarForm();
                this.isLoading = true;
                try {
                    const response = await bookService.updateBook(this.book);
                    if (!response.error) {
                        this.isLoading = false;
                        this.$emit('BookEdited', response);
                        this.closeModal();
                    }
                    console.log("Respuesta del servidor:", response);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                    this.isLoading = false;
                }
            },
        },
    });
</script>

<style></style>