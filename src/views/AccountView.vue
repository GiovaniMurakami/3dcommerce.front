<template>
  <div class="profile-outer">
    <div class="profile-container">
      <h1 class="profile-title">Meu perfil</h1>

      <div class="profile-content">
        <div class="avatar-box">
          <img :src="imagePath" alt="Avatar" class="avatar-image" />
        </div>

        <form class="profile-form">
          <input v-model="user.fullName" type="text" placeholder="Nome completo" class="input" disabled />
          <input v-model="user.email" type="email" placeholder="Email" class="input" disabled />
        </form>
      </div>

      <div class="button-box">
        <button v-if="user.role === 'ADMIN'" class="admin-button" @click="goToAdmin">
          Área Administrativa
        </button>
        <button class="logout-button" @click="logout">Sair</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import imagePath from '/icons/account.svg'

const router = useRouter()

const user = ref({
  fullName: '',
  email: '',
  cpf: '',
  phone: '',
  customerProfile: {
    address: '',
    city: ''
  },
  role: ''
})

async function fetchUser() {
  try {
    const response = await api.get('/me')
    user.value = response.data
  } catch (e) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/login')
  }
}

function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  router.push('/login')
}

function goToAdmin() {
  router.push('/admin')
}

onMounted(fetchUser)
</script>

<style scoped>
.profile-outer {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
  padding: 32px 0;
}

.profile-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background: #fff;
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
  justify-content: center;
  gap: 2.5rem;
  align-items: flex-start;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.06);
  padding: 2rem 1.5rem;
}

.profile-form {
  flex: 1;
  min-width: 260px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.input {
  padding: 0.75rem;
  background-color: #e5e5e5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
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

.admin-button {
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

.admin-button:hover {
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

@media (max-width: 900px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0.5rem;
  }

  .profile-form {
    max-width: 100%;
  }

  .profile-container {
    padding: 1.5rem 0.5rem;
  }
}
</style>