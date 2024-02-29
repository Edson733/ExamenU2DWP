<template>
    <div class="not-found">
      <h1>Pagina no encontrada</h1>
      <p>La pagina que estas buscando no existe</p>
      <b-button @click="back" class="r-button">Regresar</b-button>
    </div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>
  
<style>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .not-found h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .not-found p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .not-found .r-button {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
}

.not-found .r-button:hover {
  background-color: #3aa373;
}
</style>