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
      <button class="logout-button" @click="logout">Sair</button>
    </div>
  </div>
</template>

<script setup>
import imagePath from '/public/images/renato.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  router.push('/login')
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin-block: 2rem;
  margin-inline: auto;
  padding: 2rem;
  flex: 1 0 auto;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
}

.profile-title {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2d3a4b;
  letter-spacing: 1px;
  text-align: center;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.06);
  padding: 2rem 1.5rem;
}

.profile-form {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input {
  padding: 0.75rem;
  background-color: #e5e5e5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  width: 95%;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.2s;
  outline: none;
}

.input:focus {
  outline: none;
  background-color: #dcdcdc;
  border-color: #7b9acc;
  box-shadow: 0 0 0 2px #7b9acc33;
}

.input:hover {
  background: #f0f0f0;
}

.avatar-box {
  width: 120px;
  height: 120px;
  border: 2px solid #4caf50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eafaf1;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

.avatar-box:hover {
  border-color: #388e3c;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.10);
}

.button-box {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.save-button {
  background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
}

.save-button:hover {
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

.logout-button {
  background: linear-gradient(90deg, #e53935 0%, #b71c1c 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.08);
}

.logout-button:hover {
  background: linear-gradient(90deg, #b71c1c 0%, #e53935 100%);
  box-shadow: 0 4px 16px rgba(229, 57, 53, 0.18);
}
</style>