<template>
  <div class="register-container">
    <div class="form-box">
      <h1 class="form-title">Cadastro de produto</h1>

      <form class="form">
        <input
          type="text"
          placeholder="Nome"
          class="input"
        />

        <input
          type="text"
          placeholder="Descrição"
          class="input"
        />

<select class="input">
  <option disabled selected>Selecione a categoria</option>
  <option value="figura">Figura</option>
  <option value="peça">Peça</option>
  <option value="protótipo">Protótipo</option>
</select>


        <button
          type="submit"
          class="input"
        > Selecionar imagens </button>

        <button
          type="submit"
          class="input"
        > Selecionar arquivo 3D </button>

        <button type="submit" class="submit-button">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Lógica virá depois, se precisar
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.form-box {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  text-align: center;
}

.form-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 0.75rem;
  background-color: #e5e5e5;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  background-color: #dcdcdc;
}

.submit-button {
  width: 100%;
  background-color: #a9a9a9;
  color: #000;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #8e8e8e;
}
</style>
