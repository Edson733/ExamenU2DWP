<template>
    <div>
        <b-modal id="AddModal" @show="resetModal" @hidden="resetModal" @ok="handleOk" @cancel="resetModal" hide-header-close title="Agregar un nuevo libro" cancel-title="Cancelar" cancel-variant="outline-danger" ok-title="Añadir" ok-variant="outline-success">
            <b-form class="my-4" @submit.prevent="validarForm" @submit="handleSubmit">
                <p v-if="errors.length">
                    <b>{{ errors.length > 1 ? "Por favor corrige los siguientes errores: " : "Por favor corrige el siguiente error: " }}</b>
                    <ul>
                        <li v-for="error in errors" :key="error.index">{{ error }}</li>
                    </ul>
                </p>
                <b-form-group id="nombre-group" label="Nombre" label-for="nombre">
                    <b-form-input id="nombre" v-model="form.name" type="text" name="nombre" required></b-form-input>
                </b-form-group>
                <b-form-group id="autor-group" class="mt-3" label="Autor" label-for="autor">
                    <b-form-input id="autor" v-model="form.autor" type="text" name="autor" required></b-form-input>
                </b-form-group>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion">
                    <b-form-input id="publicacion" v-model="form.año" type="date" name="publicacion" required></b-form-input>
                </b-form-group>
                <b-form-group class="mt-3" label="Imagen" label-for="img">
                    <input type="file" @change="uploadImage" />
                </b-form-group>
            </b-form>
            <ModalSpinner :isLoading="isLoading"/>
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
        data() {
            return {
                form: {
                    name: null,
                    autor: null,
                    año: null,
                    file:null
                },
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
                    const response = await axios.post('https://api.cloudinary.com/v1_1/iotimages/books',formData,{
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

                if (!this.form.name) {
                    this.errors.push("Nombre del libro obligatorio.");
                }

                if (!this.form.autor) {
                    this.errors.push("Nombre del autor obligatorio.");
                }

                if (!this.form.año) {
                    this.errors.push("El año de publicacion es obligatorio.");
                } else if (this.form.año < 1000 || this.form.año > new Date().getFullYear()) {
                    this.errors.push("Coloca un año de publicacion valido.");
                }

                if (!this.errors.length > 0) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
            },
            resetModal() {
                this.form.name = null
                this.form.autor = null
                this.form.año = null
                this.errors = []
            },
            handleOk(bvModalEvent) {
                bvModalEvent.preventDefault();
                this.handleSubmit();
            },
            async handleSubmit() {
                this.validarForm();
                this.isLoading = true;
                try {
                    
                    const response = await services.postBook(this.form);
                    if (!response.error) {
                        this.isLoading = false;
                        this.resetModal();
                        this.$emit('BookSaved');
                        this.$bvModal.hide('Modal');
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