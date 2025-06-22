<template>
  <div class="description-section">
    <hr class="divider" />
    <div class="most-accessed-categories">Gerenciar produtos</div>

    <div style="display: flex; margin-bottom: 32px">
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Pesquisar..." @input="fetchProducts" />
      </div>
      <button class="button" @click="router.push('/createproduct')">Criar novo produto</button>
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
              <button class="button" @click="goToEditProduct(product.id)">Editar produto</button>
              <button class="button delete" style="background-color: indianred;" @click="deleteProduct(product.id)">
                Excluir produto
              </button>
            </div>
          </div>
        </div>

        <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="handlePageChange" :currentPage="currentPage"/>
      </div>

      <div v-else>
        <p>Nenhum produto encontrado.</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch  } from 'vue'
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

async function fetchProducts() {
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
    console.log('false entao ne');
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
.delete {
  margin-left: 8px;
}

.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0;
}

.most-accessed-categories {
  font-size: 22px;
  border-radius: 12px;
  padding: 0 16px;
  margin-bottom: 15px;
  font-weight: bold;
}

.description-section {
  margin: 0 10%;
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

.cart-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.cart-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  flex-grow: 1;
}

.cart-list-content {
  display: flex;
  gap: 24px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: #dfdfdf;
  padding: 10px;
  border-radius: 12px;
}

.cart-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-quantity-controls button {
  width: 32px;
  height: 32px;
  font-size: 18px;
  background-color: #ADADAD;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-details {
  flex-grow: 1;
}

.product-name {
  font-weight: bold;
  margin: 0;
}

.product-desc {
  font-size: 0.9rem;
  color: gray;
  margin: 6px 0;
}

.product-price {
  font-size: 1rem;
  color: #222;
  margin: 4px 0;
}

.cart-total {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
}

.cart-total strong {
  margin-bottom: 5px;
  display: block;
}

.total-value {
  margin-top: 5px;
}

.button {
  padding: 4px 12px;
  border-radius: 8px;
  background-color: #ADADAD;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #999999;
}

.buy-button {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #ADADAD;
  border: none;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #999999;
}

.another-products-section {
  margin-top: 40px;
}

.cards-container {
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>