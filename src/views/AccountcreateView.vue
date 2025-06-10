<template>
  <div class="register-container">
    <div class="form-box animate__animated animate__fadeInDown">
      <h1 class="form-title">Cadastro</h1>

      <form class="form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <input v-model="form.fullName" :class="inputClass(valid.fullName)" @blur="validateField('fullName')"
            type="text" placeholder="Nome completo" required />
          <span v-if="valid.fullName === false" class="error-msg">Nome inválido</span>
        </div>

        <div class="input-group">
          <input v-model="form.email" :class="inputClass(valid.email)" @blur="validateField('email')" type="email"
            placeholder="Email" required />
          <span v-if="valid.email === false" class="error-msg">Email inválido</span>
        </div>

        <div class="input-group">
          <input v-model="form.cpf" :class="inputClass(valid.cpf)" @blur="validateField('cpf')" type="text"
            placeholder="CPF" required />
          <span v-if="valid.cpf === false" class="error-msg">CPF inválido</span>
        </div>

        <div class="input-group">
          <input v-model="form.phone" :class="inputClass(valid.phone)" @blur="validateField('phone')" type="text"
            placeholder="Telefone" required />
          <span v-if="valid.phone === false" class="error-msg">Telefone inválido</span>
        </div>

        <div class="password-group">
          <input v-model="form.password" :class="inputClass(valid.password)" @blur="validateField('password')"
            :type="showPassword ? 'text' : 'password'" placeholder="Senha" required />
          <span class="eye-icon" @click="showPassword = !showPassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
              viewBox="0 0 24 24">
              <path stroke="#4caf50" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" stroke="#4caf50" stroke-width="2" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path stroke="#e53935" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" stroke="#e53935" stroke-width="2" />
              <line x1="3" y1="21" x2="21" y2="3" stroke="#e53935" stroke-width="2" />
            </svg>
          </span>
          <span v-if="valid.password === false" class="error-msg">Senha deve ter pelo menos 8 caracteres</span>
        </div>

        <div class="password-group">
          <input v-model="form.confirmPassword" :class="inputClass(valid.confirmPassword)"
            @blur="validateField('confirmPassword')" :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirmar senha" required />
          <span class="eye-icon" @click="showConfirmPassword = !showConfirmPassword">
            <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
              viewBox="0 0 24 24">
              <path stroke="#4caf50" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" stroke="#4caf50" stroke-width="2" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path stroke="#e53935" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" stroke="#e53935" stroke-width="2" />
              <line x1="3" y1="21" x2="21" y2="3" stroke="#e53935" stroke-width="2" />
            </svg>
          </span>
          <span v-if="valid.confirmPassword === false" class="error-msg">Senhas não conferem</span>
        </div>

        <div class="input-group">
          <input v-model="form.customerProfile.address" :class="inputClass(valid.address)"
            @blur="validateField('address')" type="text" placeholder="Endereço" required />
          <span v-if="valid.address === false" class="error-msg">Endereço obrigatório</span>
        </div>

        <div class="input-group">
          <input v-model="form.customerProfile.city" :class="inputClass(valid.city)" @blur="validateField('city')"
            type="text" placeholder="Cidade" required />
          <span v-if="valid.city === false" class="error-msg">Cidade obrigatória</span>
        </div>

        <button type="submit" class="submit-button" :disabled="!isFormValid">
          Cadastrar
        </button>
        <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const successMessage = ref('')

// Validação simples para cada campo
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function validateCPF(cpf) {
  return /^\d{11}$/.test(cpf)
}
function validatePhone(phone) {
  return /^\d{10,11}$/.test(phone)
}
function validatePassword(password) {
  return password.length >= 8
}

const form = reactive({
  email: '',
  fullName: '',
  cpf: '',
  phone: '',
  password: '',
  confirmPassword: '',
  customerProfile: {
    address: '',
    city: ''
  }
})

const valid = reactive({
  email: null,
  fullName: null,
  cpf: null,
  phone: null,
  password: null,
  confirmPassword: null,
  address: null,
  city: null
})

function validateField(field) {
  switch (field) {
    case 'email':
      valid.email = validateEmail(form.email)
      break
    case 'fullName':
      valid.fullName = form.fullName.trim().length > 2
      break
    case 'cpf':
      valid.cpf = validateCPF(form.cpf)
      break
    case 'phone':
      valid.phone = validatePhone(form.phone)
      break
    case 'password':
      valid.password = validatePassword(form.password)
      break
    case 'confirmPassword':
      valid.confirmPassword = form.password === form.confirmPassword && form.confirmPassword.length > 0
      break
    case 'address':
      valid.address = form.customerProfile.address.trim().length > 0
      break
    case 'city':
      valid.city = form.customerProfile.city.trim().length > 0
      break
  }
}

const isFormValid = computed(() =>
  valid.email &&
  valid.fullName &&
  valid.cpf &&
  valid.phone &&
  valid.password &&
  valid.confirmPassword &&
  valid.address &&
  valid.city
)

function inputClass(status) {
  return [
    'input',
    status === true ? 'input-valid' : '',
    status === false ? 'input-invalid' : ''
  ]
}

async function handleSubmit() {
  Object.keys(valid).forEach(validateField)
  if (!isFormValid.value) return

  const payload = {
    email: form.email,
    fullName: form.fullName,
    cpf: form.cpf,
    phone: form.phone,
    password: form.password,
    customerProfile: {
      address: form.customerProfile.address,
      city: form.customerProfile.city
    }
  }
  try {
    const response = await api.post('/users', payload)
    if (response.data && response.data.id) {
      successMessage.value = 'Cadastro realizado com sucesso! Redirecionando para o login...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    // Aqui você pode mostrar mensagem de erro para o usuário
  }
}
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.register-container {
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

.input-group,
.password-group {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.password-group {
  margin-bottom: 1.5rem;
}

.password-group .input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
}

.eye-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  z-index: 2;
  transition: filter 0.2s;
  height: 22px;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.password-group .error-msg {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  animation: shake 0.2s;
  background: transparent;
  z-index: 1;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
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
  font-size: 0.88rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  animation: shake 0.2s;
}

.success-msg {
  color: #388e3c;
  background: #eafaf1;
  border: 1px solid #4caf50;
  border-radius: 6px;
  padding: 0.7rem 1rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

.submit-button {
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

.submit-button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
  color: #fff;
}

.submit-button:not(:disabled):hover {
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}
</style>