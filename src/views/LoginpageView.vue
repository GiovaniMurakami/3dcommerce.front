<template>
  <div class="login-container">
    <div class="form-box animate__animated animate__fadeInDown">
      <h1 class="form-title">Iniciar sessão</h1>

      <form class="form" @submit.prevent="handleLogin">
        <div class="input-group">
          <input v-model="form.email" :class="inputClass(valid.email)" @blur="validateField('email')" type="text"
            placeholder="Email" required />
          <span v-if="valid.email === false" class="error-msg">Email inválido</span>
        </div>

        <div class="input-group">
          <input v-model="form.password" :class="inputClass(valid.password)" @blur="validateField('password')"
            type="password" placeholder="Senha" required />
          <span v-if="valid.password === false" class="error-msg">Senha obrigatória</span>
        </div>



        <div class="forgot-password">
          <a href="#">Esqueci a senha</a>
        </div>

        <button type="submit" class="login-button" :disabled="!isFormValid">Login</button>
        <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
        <button type="button" class="create-account-button" @click="router.push('/createaccount')">
          Criar conta
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})
const errorMessage = ref('')

const valid = ref({
  email: null,
  password: null
})

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function validatePassword(password) {
  return password.length > 0
}

function validateField(field) {
  if (field === 'email') {
    valid.value.email = validateEmail(form.value.email)
  }
  if (field === 'password') {
    valid.value.password = validatePassword(form.value.password)
  }
}

const isFormValid = computed(() =>
  valid.value.email && valid.value.password
)

function inputClass(status) {
  return [
    'input',
    status === true ? 'input-valid' : '',
    status === false ? 'input-invalid' : ''
  ]
}

async function handleLogin() {
  validateField('email')
  validateField('password')
  if (!isFormValid.value) return

  errorMessage.value = ''
  try {
    const response = await api.post('/login', {
      email: form.value.email,
      password: form.value.password
    })
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
      router.push('/')
    }
  } catch (err) {
    errorMessage.value = 'Email ou senha inválidos.'
  }
}
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
}

.form-box {
  width: 100%;
  max-width: 420px;
  padding: 2rem 1.5rem;
  text-align: center;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: box-shadow 0.3s;
  margin-block: 1rem;
}

.form-box:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22);
}

.form-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2d3a4b;
  letter-spacing: 1px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.input-group {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 0.75rem;
  background-color: #e5e5e5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.2s;
  outline: none;
}

.input:focus {
  background-color: #dcdcdc;
  border-color: #7b9acc;
  box-shadow: 0 0 0 2px #7b9acc33;
}

.input-valid {
  border-color: #4caf50 !important;
  background: #eafaf1;
  box-shadow: 0 0 0 2px #4caf5040;
}

.input-invalid {
  border-color: #e53935 !important;
  background: #fff0f0;
  box-shadow: 0 0 0 2px #e5393540;
}

.input:hover {
  background: #f0f0f0;
}

.error-msg {
  color: #e53935;
  font-size: 0.95rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  animation: shake 0.2s;
  text-align: left;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-3px);
  }

  50% {
    transform: translateX(3px);
  }

  75% {
    transform: translateX(-3px);
  }

  100% {
    transform: translateX(0);
  }
}

.forgot-password {
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
  width: 100%;
}

.forgot-password a {
  color: #333;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.create-account-button {
  width: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.2rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  transition: background 0.3s, box-shadow 0.3s;
}

.create-account-button:hover {
  background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

.login-button {
  width: 100%;
  background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  transition: background 0.3s, box-shadow 0.3s;
}

.login-button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
  color: #fff;
}

.login-button:not(:disabled):hover {
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}
</style>