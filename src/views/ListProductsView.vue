<template>
  <div class="page-container">
    <div class="filters-container">
      <div class="filter" data-label="Ordenar:">
        <select class="input" v-model="sortBy" @change="updateRoute">
          <option value="createdAt_desc">Mais recentes</option>
          <option value="views_desc">Mais acessados</option>
          <option value="price_asc">Preço crescente</option>
          <option value="price_desc">Preço decrescente</option>
          <option value="name_asc">Nome (A-Z)</option>
        </select>
      </div>

      <div class="filter" data-label="Categoria:">
        <select class="input" v-model="categoryName" @change="updateRoute">
          <option value="">Todas</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="description-section">
      <div class="cards-container">
        <template v-if="isLoading">
          <SkeletonCard v-for="n in 8" :key="n" />
        </template>

        <template v-else-if="isEmpty">
          <p>Nenhum produto encontrado.</p>
        </template>

        <template v-else>
          <ProductCard v-for="product in mostAcessedProducts" :key="product.id" :product="product" />
        </template>
      </div>

      <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="handlePageChange"   :currentPage="currentPage"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import type { ProductDTO } from '../dtos/productDto';
import type { CategoryDTO } from '../dtos/categoryDto';
import ProductCard from '../components/ProductCard.vue';
import Pagination from '../components/Pagination.vue';
import SkeletonCard from '../components/skeletons/SkeletonCard.vue';

const route = useRoute();
const router = useRouter();

const mostAcessedProducts = ref<ProductDTO[]>([]);
const categories = ref<CategoryDTO[]>([]);

const sortBy = ref<string>((route.query.sortBy as string) || 'views_desc');
const categoryName = ref<string>((route.query.categoryName as string) || '');
const productName = ref<string>((route.query.name as string) || '');

const currentPage = ref(Number(route.query.page) || 1);
const itemsPerPage = 8;
const totalItems = ref(0);
const isLoading = ref(true);
const isEmpty = ref(false);

async function fetchCategories() {
  try {
    const response = await categoryService.list();
    categories.value = response || [];
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

async function fetchProducts() {
  isLoading.value = true;
  isEmpty.value = false;
  const [field, direction] = sortBy.value.split('_');
  try {
    const response = await productService.list({
      sortBy: field,
      sortDir: direction,
      categoryName: categoryName.value || undefined,
      name: productName.value || undefined,
      page: currentPage.value,
      limit: itemsPerPage,
    });
    mostAcessedProducts.value = response.data;
    totalItems.value = response.total;
    isEmpty.value = response.data.length === 0;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  } finally {
    isLoading.value = false;
  }
}

function updateRoute() {
  router.replace({
    query: {
      ...route.query,
      sortBy: sortBy.value,
      categoryName: categoryName.value || undefined,
      page: '1',
    },
  });
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

onMounted(async () => {
  await fetchCategories();
  fetchProducts();
});

watch(() => route.query, (newQuery) => {
  sortBy.value = (newQuery.sortBy as string) || 'views_desc';
  categoryName.value = (newQuery.categoryName as string) || '';
  currentPage.value = Number(newQuery.page) || 1;
  productName.value = (newQuery.name as string) || '';
  fetchProducts();
});
</script>

<style scoped>

.input {
  width: 100%;
  padding: 0.75rem;
  background-color: #e5e5e5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
  /* REMOVE appearance se quiser manter a seta padrão */
  /* appearance: none; */
}

.input:hover {
  background-color: #f0f0f0;
}

.input:focus {
  background-color: #dcdcdc;
  border-color: #7b9acc;
  box-shadow: 0 0 0 2px #7b9acc33;
}



.page-container {
  padding: 20px;
}

.filters-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2.5rem;
  margin-left: 17%;
  margin-bottom: 4vh;
  flex-wrap: wrap; /* caso precise quebrar em telas menores */
}

.filter {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  gap: 0.75rem;
  color: #333;
  user-select: none;
}

/* Label (Ordenar:, Categoria:) */
.filter::before {
  content: attr(data-label);
  font-weight: 700;
  color: #555;
  margin-right: 0.5rem;
  white-space: nowrap;
}

/* Remove o texto antigo e usa data-label no HTML */


.description-section {
  margin: 0 10%;
}

.cards-container {
  display: flex;
  gap: 4vw;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
