<template>
  <div class="profile-container">
    <h1 class="profile-title">Meu perfil</h1>

    <div class="profile-content">
      <div class="avatar-box">
        <img :src="imagePath" alt="Avatar" class="avatar-image" />
      </div>

      <form class="profile-form">
        <input type="text" placeholder="Nome completo" class="input" />
        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input" />
      </form>
    </div>

    <div class="button-box">
      <button class="save-button">Salvar</button>
    </div>
  </div>
</template>

<script setup>
import imagePath from '/public/images/renato.jpg'
// Lógica futura aqui
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1 0 auto;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
}

.profile-title {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
}

.profile-form {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Increased gap to separate input fields */
}

.input {
  padding: 0.75rem;
  background-color: #e5e5e5;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.input:focus {
  outline: none;
  background-color: #dcdcdc;
}

.avatar-box {
  width: 120px;
  height: 120px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Ensuring the image is circular */
  object-fit: cover;  /* Ensuring the image covers the box nicely */
}

.button-box {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.save-button {
  background-color: #a9a9a9;
  color: #000;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #8e8e8e;
}
</style>