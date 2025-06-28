<template>
  <div class="description-section">
    <hr class="divider" />
    <div class="most-accessed-categories title-center">Gerenciar produtos</div>

    <div class="actions-bar actions-bar-center">
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Pesquisar..." @input="fetchProducts" />
      </div>
      <button class="main-btn" @click="router.push('/createproduct')">Criar novo produto</button>
    </div>

    <div class="cart-container">
      <div class="cart-list" v-if="isLoading">
        <SkeletonManageProduct v-for="n in 5" :key="n" />
      </div>

      <div class="cart-list" v-else-if="products.length">
        <div class="cart-items">
          <div v-for="product in products" :key="product.id" class="cart-item">
            <img :src="product.mainImageUrl || 'https://via.placeholder.com/60'" alt="Imagem do produto"
              class="cart-image" />
            <div class="cart-details">
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">R$ {{ (product.price).toFixed(2) }}</p>
              <div class="btn-group">
                <button class="main-btn edit-btn" @click="goToEditProduct(product.id)">Editar</button>
                <button class="main-btn delete-btn" @click="deleteProduct(product.id)">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>

        <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="handlePageChange"
          :currentPage="currentPage" />
      </div>

      <div v-else>
        <p class="empty-message">Nenhum produto encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { productService } from '../services/productService'
import Pagination from '../components/Pagination.vue'
import type { ProductDTO } from '../dtos/productDto'
import { useRoute, useRouter } from 'vue-router';
import SkeletonManageProduct from '../components/skeletons/SkeletonManageProduct.vue'

const route = useRoute();
const router = useRouter();

const products = ref<ProductDTO[]>([])
const currentPage = ref(Number(route.query.page) || 1);
const totalItems = ref(0)
const searchTerm = ref('')
const isLoading = ref(true)
const itemsPerPage = 5;

watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1;
  fetchProducts();
});

watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1;
  fetchProducts();
});

async function fetchProducts() {
  isLoading.value = true

  isLoading.value = true

  try {
    const { data, total } = await productService.list({
      page: currentPage.value,
      limit: itemsPerPage,
      name: searchTerm.value || undefined,
    })

    products.value = data
    totalItems.value = total
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  } finally {
    isLoading.value = false;
  }
}

function handlePageChange(page: number) {
  currentPage.value = page;
  router.replace({
    query: {
      ...route.query,
      page: page.toString(),
    },
  });
  currentPage.value = page;
  router.replace({
    query: {
      ...route.query,
      page: page.toString(),
    },
  });
}

function goToEditProduct(id: string) {
  router.push(`/editproduct/${id}`)
}

async function deleteProduct(id: string) {
  try {
    await productService.deleteById(id);
    await fetchProducts();
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.description-section {
  margin: 0 10%;
  padding-bottom: 32px;
}

.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0;
}

.most-accessed-categories {
  font-size: 1.3rem;
  border-radius: 12px;
  padding: 0 16px;
  margin-bottom: 15px;
  font-weight: bold;
  background: #ADADAD;
  width: fit-content;
}

.title-center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  float: none;
}

.actions-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 32px;
  align-items: center;
  justify-content: space-between;
}

.actions-bar-center {
  justify-content: center;
  gap: 1.2rem;
}


.search-bar {
  flex: 1;
  max-width: 400px;
  display: flex;
}

.search-bar input {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  background: #f5f5f5;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: #007BFF;
  background: #f0f8ff;
}

.main-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  margin-left: 0.5rem;
  margin-top: 0;
}

.main-btn:hover {
  background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

.edit-btn {
  background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
}

.delete-btn {
  background: #e53935;
  margin-left: 8px;
}

.delete-btn:hover {
  background: #b71c1c;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 10px;
}


.cart-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}

.cart-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  flex-grow: 1;
  width: 100%;
}

.cart-items {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 18px;
  min-width: 260px;
  max-width: 700px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  background-color: #f9f9fb;
  padding: 18px 16px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, background 0.2s;
  flex-wrap: wrap;
}

.cart-item:hover {
  background: #f0f4ff;
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.10);
}

.cart-image {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  background: #fff;
}

.cart-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
}

.product-name {
  font-weight: bold;
  margin: 0;
  font-size: 1.1rem;
  color: #222;
}

.product-price {
  font-size: 1rem;
  color: #007BFF;
  font-weight: 600;
  margin: 4px 0;
}

.empty-message {
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin: 2rem 0;
}

@media (max-width: 1100px) {
  .description-section {
    margin: 0 2vw;
  }

  .cart-items {
    max-width: 100vw;
    min-width: 0;
  }
}

@media (max-width: 700px) {
  .description-section {
    margin: 0 0.5vw;
    padding-bottom: 16px;
  }

  .actions-bar,
  .actions-bar-center {
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
    justify-content: center;
  }

  .main-btn {
    width: 100%;
    margin-left: 0;
  }

  .cart-items {
    gap: 10px;
    padding: 0;
  }

  .cart-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 14px 8px;
  }

  .cart-image {
    width: 60px;
    height: 60px;
    margin: 0 auto;
  }

  .cart-details {
    min-width: 0;
  }

  .title-center {
    font-size: 1.1rem;
    padding: 0 8px;
  }
}
</style>