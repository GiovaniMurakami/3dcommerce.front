<template>
  <header>
    <div class="header-container">

      <div class="title-container">
        <img src="/icons/3d-machine.svg" class="header-icon" />
        <div class="header-title">3D Commerce</div>
      </div>

      <div class="search-bar">
        <input 
          v-model="searchTerm" 
          @keyup.enter="doSearch" 
          type="text" 
          placeholder="Pesquisar produtos..."
        />
        <button @click="doSearch">🔍</button>
      </div>

      <div class="icons">
        <button><img src="/icons/account.svg" class="header-icon" /></button>
        <button><img  @click="goToCart" src="/icons/shopping-cart.svg" class="header-icon" /></button>
      </div>
    </div>

    <nav class="navbar">
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/products">Produtos</router-link></li>
        <li 
          class="dropdown" 
          @mouseenter="showDropdown = true" 
          @mouseleave="showDropdown = false"
          :aria-expanded="showDropdown.toString()"
        >
          <a href="#" @click.prevent>
            Categorias 
            <span 
              class="dropdown-arrow" 
              :class="{ open: showDropdown }"
              aria-hidden="true"
            ></span>
          </a>
          <ul :style="{ display: showDropdown ? 'block' : 'none' }" class="dropdown-menu" role="menu">
            <div class="dropdown-container">
              <li 
              v-for="category in categories" 
              :key="category.id"
              role="menuitem"
            >
              <router-link 
                :to="{ path: '/products', query: { categoryName: category.name } }"
                @click.native="showDropdown = false"
              >
                {{ category.name }}
              </router-link>
            </li>
            </div>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { categoryService } from '../services/categoryService';

const searchTerm = ref('')
const router = useRouter()

const categories = ref<{ id: string; name: string }[]>([])
const showDropdown = ref(false)

async function loadCategories() {
  try {
    categories.value = await categoryService.list();
  } catch (error) {
    console.error('Erro ao carregar categorias', error)
  }
}

function goToCart() {
  router.push('/cart')
}

function doSearch() {
  const query = searchTerm.value.trim()
  if (!query) return

  router.push({ name: 'ProductDetailView', query: { name: query } })
}

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
header {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
}

.header-icon {
  height: 58px;
}

.header-title {
  font-size: 30px;
}

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
  transition: background-color 0.2s ease;
}

.search-bar button:hover {
  background-color: #0056b3;
}

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

.dropdown {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.dropdown-container {
  border: solid 1px #333;
  border-top: none;
  z-index: 100;
  position: absolute;
}

.dropdown-container li {
}

.dropdown-arrow {
  display: inline-block;
  margin-left: 6px;
  width: 0;
  height: 0;
  vertical-align: middle;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  padding-left: 0px !important;
}

.dropdown-menu li {
  padding: 8px 10px;
  background-color: white;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
  width: 100%;
}
</style>
