<template>
  <b-container class="mt-3" fluid>
    <b-row class="mb-3 text-center">
      <b-col cols="10"><h1>Biblioteca</h1></b-col>
      <b-col cols="2">
        <b-button class="m-1" variant="outline-success" @click="openModal()"><b-icon icon="plus-circle-fill"></b-icon></b-button>
        <Modal/>
      </b-col>
    </b-row>
    <b-row >
      <b-container class="d-flex justify-content-center" fluid>
        <div class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
          <div class="drag-el" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
            <b-row>
              <h3 class="mt-2">Añadir libro por drog</h3>
            </b-row>
            <b-row>
              <b-form v-show="formVisible">
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
                <b-form-group id="category-group" class="mt-3" label="Genero" label-for="category">
                  <b-form-select id="category" v-model="form.category.id" :options="categories" value-field="id" text-field="name"/>
                </b-form-group>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion">
                  <b-form-input id="publicacion" v-model="form.año" type="number" name="publicacion" required></b-form-input>
                </b-form-group>
              </b-form>
            </b-row>
          </div>
        </div>
      </b-container>
    </b-row>
    <b-row>
      <b-col>
        <div class="drop-zone" @dragover.prevent @dragenter.prevent @drop="handleDrop">
          <Card/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import bookService from "../services/Book";
  import categoryService from "../services/Category";

  export default Vue.extend({
    components:{
      Modal: () => import("@/components/Modal.vue"),
      Card: () => import("@/components/Card.vue"),
    },
    data() {
      return {
        formVisible: true,
        form: {
          name: null,
          autor: null,
          category: {
            id: null,
          },
          año: null,
        },
        categories: [],
        errors: [],
      }
    },
    mounted() {
      this.getCategories();
      window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleDragStart(event) {
        // Indica qué información se está arrastrando
        event.dataTransfer.setData('text/plain', 'form-data');
        this.dragging = true;
      },
      handleDragEnd() {
        this.dragging = false;
      },
      handleDrop(event) {
        if (this.dragging) {
          // Aquí se envía la información del formulario
          this.addBook();
        }
      },
      openModal() {
        this.$nextTick(() => {
          this.$bvModal.show("Modal");
        });
      },
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

        if (!this.form.name) {
          this.errors.push("Nombre del libro obligatorio.");
        }

        if (!this.form.autor) {
          this.errors.push("Nombre del autor obligatorio.");
        }

        if (!this.form.category.id) {
          this.errors.push("Genero del libro es obligatorio.");
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
      resetForm() {
        this.form.name = null
        this.form.autor = null
        this.form.category = {
          id: null
        }
        this.form.año = null
        this.errors = []
      },
      async addBook() {
        this.validarForm();
        try {
          const response = await bookService.saveBook(this.form);
          if (!response.error) {
            this.resetForm();
            this.$emit('BookDrogSaved');
          }
          console.log("Respuesta del servidor:", response);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      handleScroll() {
        this.formVisible = window.scrollY < 105;
      },
    }
  });
</script>

<style></style>