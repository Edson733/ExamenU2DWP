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
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion">
                    <b-form-input id="publicacion" v-model="book.año" type="date" name="publicacion" required></b-form-input>
                </b-form-group>
                <b-form-group class="mt-3" label="Imagen" label-for="img">
                    <input type="file" @change="uploadImage" />
                </b-form-group>
            </b-form>
            <ModalSpinner :isLoading="isLoading" />
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import axios from "axios";
    import services from '../services/services';

    export default Vue.extend({
        components: {
            ModalSpinner: () => import("@/components/ModalSpinner.vue"),
        },
        props: {
            book: Object,
        },
        data() {
            return {
                errors: [],
                isLoading: false,
            };
        },
        methods: {
            async uploadImage(event) {
                this.loading = true;

                const file = event.target.files[0];
                const formData = new FormData();
                formData.append('upload_preset', 'bookstore');
                formData.append('file', file);
                formData.append('api_key', '349172557836694396565225139577');
                formData.append('folder', 'books');

                try {
                    const response = await axios.post('https://api.cloudinary.com/v1_1/iotimages/books', formData, {
                        headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': 'http://localhost:5173', skip: 'true'},
                    });
                    this.file = response.secure_url;
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
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
                    const response = await services.updateBook(this.book);
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