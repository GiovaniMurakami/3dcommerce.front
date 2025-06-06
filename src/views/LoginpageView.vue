<template>
  <div class="login-container">
    <div class="form-box">
      <h1 class="form-title">Iniciar sessão</h1>

      <form class="form">
        <input
          type="text"
          placeholder="Email"
          class="input"
        />

        <input
          type="password"
          placeholder="Senha"
          class="input"
        />

        <div class="forgot-password">
          <a href="#">Esqueci a senha</a>
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Nenhuma lógica por enquanto
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.form-box {
  width: 120%;
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
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  background-color: #dcdcdc;
}

.forgot-password {
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
}

.forgot-password a {
  color: #333;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.login-button {
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

.login-button:hover {
  background-color: #8e8e8e;
}
</style>
