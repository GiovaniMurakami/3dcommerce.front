<template>
  <header>
    <div class="header-container">
      <div class="title-container" @click="goHome" style="cursor:pointer;">
        <img src="/icons/3d-machine.svg" class="header-icon" />
        <div class="header-title">3D Commerce</div>
      </div>

      <div class="search-bar">
        <input v-model="searchTerm" @keyup.enter="doSearch" type="text" placeholder="Pesquisar produtos..." />
        <button @click="doSearch">🔍</button>
      </div>

      <div class="icons">
        <button @click="goToAccount">
          <img src="/icons/account.svg" class="header-icon" />
        </button>
        <button @click="goToCart" class="cart-btn">
          <img src="/icons/shopping-cart.svg" class="header-icon" />
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>
    </div>

    <nav class="navbar">
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/products">Produtos</router-link></li>
        <li class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false"
          :aria-expanded="showDropdown">
          <a href="#" @click.prevent>
            Categorias
            <span class="dropdown-arrow" :class="{ open: showDropdown }" aria-hidden="true"></span>
          </a>
          <ul :style="{ display: showDropdown ? 'block' : 'none' }" class="dropdown-menu" role="menu">
            <div class="dropdown-container">
              <li v-for="category in categories" :key="category.id" role="menuitem">
                <router-link :to="{ path: '/products', query: { categoryName: category.name } }"
                  @click.native="showDropdown = false">
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

const cartCount = ref(0);

function goHome() {
  router.push('/');
}

function goToAccount() {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (isLoggedIn) {
    router.push('/account');
  } else {
    router.push('/login');
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartCount.value = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
}

onMounted(() => {
  loadCategories();
  updateCartCount();
  window.addEventListener('storage', updateCartCount);
});

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

  router.push({ name: 'ListProductsView', query: { name: query } })
}
</script>

<style scoped>
header {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  min-width: 180px;
}

.header-icon {
  height: 44px;
  width: 44px;
}

.header-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 1px;
}

.search-bar {
  flex: 1;
  max-width: 500px;
  display: flex;
  margin: 0 20px;
  min-width: 180px;
}

.search-bar input {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #ccc;
  border-radius: 6px 0 0 6px;
  outline: none;
  font-size: 1rem;
  background: #f5f5f5;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: #007BFF;
  background: #f0f8ff;
}

.search-bar button {
  padding: 10px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1.1rem;
  font-weight: 600;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.icons {
  display: flex;
  gap: 15px;
  align-items: center;
}

.icons button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icons button:hover {
  background: #f0f4ff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.10);
  color: #007BFF;
  transform: scale(1.08);
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: #03009e;
  color: #fff;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 2;
}

.navbar {
  background-color: #f7f7f7;
  width: 100%;
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
  flex-wrap: wrap;
}

.navbar li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.08rem;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.navbar li a:hover {
  color: #007BFF;
  background: #e3f0ff;
}

.dropdown {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.dropdown-container {
  border-top: none;
  z-index: 100;
  position: absolute;
  background: #fff;
  border-radius: 0 0 8px 8px;
  min-width: 180px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.07);
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
  left: 0;
  top: 100%;
  min-width: 180px;
  background: #fff;
}

.dropdown-menu li {
  padding: 0;
  background-color: white;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
  width: 100%;
  border-radius: 6px;
  padding: 8px 10px;
  box-sizing: border-box;
}

.dropdown-menu li a:hover {
  background: #e3f0ff;
  color: #007BFF;
}

@media (max-width: 900px) {
  .header-container {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    padding: 10px 8px;
  }

  .search-bar {
    margin: 0 0 10px 0;
    max-width: 100vw;
  }

  .navbar ul {
    gap: 16px;
    height: auto;
    padding: 0 8px;
  }
}

@media (max-width: 600px) {
  .header-title {
    font-size: 1.3rem;
  }

  .header-icon {
    height: 32px;
    width: 32px;
  }

  .header-container {
    padding: 8px 2vw;
    gap: 0.5rem;
  }

  .search-bar input,
  .search-bar button {
    font-size: 0.97rem;
    padding: 8px 8px;
  }

  .navbar ul {
    gap: 8px;
    padding: 0 2vw;
  }

  .navbar li a {
    font-size: 0.98rem;
    padding: 5px 7px;
  }
}
</style>