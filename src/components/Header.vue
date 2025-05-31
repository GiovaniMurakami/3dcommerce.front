<template>
  <header>
    <!-- Header Principal -->
    <div class="header-container">
      <!-- Logo -->

      <div class="title-container">
        <img src="/icons/3d-machine.svg" class="header-icon">
        <div class="header-title">3D Commerce</div>
      </div>
      <!-- Barra de pesquisa -->
      <div class="search-bar">
        <input type="text" placeholder="Pesquisar produtos..." />
        <button>
          🔍
        </button>
      </div>

      <!-- Ícones de usuário e carrinho -->
      <div class="icons">
        <button><img src="/icons/account.svg" class="header-icon"></button>
        <button><img src="/icons/shopping-cart.svg" class="header-icon"></button>
      </div>
    </div>

    <!-- Navbar de categorias -->
    <nav class="navbar">
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Produtos</a></li>
        <li><a href="#">Categorias</a><div class="dropdown-arrow"></div></li>
        
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Nenhuma lógica necessária
</script>

<style scoped>
/* Estilo geral */
header {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Header principal */
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo span {
  font-size: 20px;
  font-weight: bold;
}

/* Barra de pesquisa */
.search-bar {
  flex: 1;
  max-width: 500px;
  display: flex;
  margin: 0 20px;
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-bar button {
  padding: 8px 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

/* Ícones */
.icons {
  display: flex;
  gap: 15px;
}

.icons button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.icons button:hover {
  color: #007BFF;
}

/* Navbar de categorias */
.navbar {
  background-color: #f7f7f7;
}

.navbar ul {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  list-style: none;
  display: flex;
  gap: 30px;
  height: 50px;
  align-items: center;
}

.navbar li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.navbar li a:hover {
  color: #007BFF;
}

.header-icon {
    height: 58px;
}

.header-title {
    size: 60px;
    font-size: 30px;
}

.title-container {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: bold;
}
.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  display: inline-block;
  margin-left: 4px;
}

</style>
