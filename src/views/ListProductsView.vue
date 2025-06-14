<template>
  <div class="page-container">
    <div class="sort-container">
      Ordenar:
      <select v-model="sortBy" @change="updateRoute">
        <option value="createdAt_desc">Mais recentes</option>
        <option value="views_desc">Mais acessados</option>
        <option value="price_asc">Preço crescente</option>
        <option value="price_desc">Preço decrescente</option>
        <option value="name_asc">Nome (A-Z)</option>
      </select>
    </div>

    <div class="category-filter">
      Categoria:
      <select v-model="categoryName" @change="updateRoute">
        <option value="">Todas</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="description-section">
      <div class="cards-container">
        <ProductCard
          v-for="product in mostAcessedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService'; // importe seu service de categorias
import type { ProductDTO } from '../dtos/productDto';
import ProductCard from '../components/ProductCard.vue';
import type { CategoryDTO } from '../dtos/categoryDto';

const route = useRoute();
const router = useRouter();

const mostAcessedProducts = ref<ProductDTO[]>([]);
const categories = ref<CategoryDTO[]>([]);

const sortBy = ref<string>((route.query.sortBy as string) || 'views_desc');
const categoryName = ref<string>((route.query.categoryName as string) || '');

async function fetchCategories() {
  try {
    const response = await categoryService.list();
    categories.value = response || [];
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

async function fetchProducts() {
  const [field, direction] = sortBy.value.split('_');
  try {
    const response = await productService.list({
      sortBy: field,
      sortDir: direction,
      categoryName: categoryName.value || undefined,
    });
    mostAcessedProducts.value = response || [];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

function updateRoute() {
  router.replace({
    query: {
      ...route.query,
      sortBy: sortBy.value,
      categoryName: categoryName.value || undefined,
    }
  });
}

onMounted(async () => {
  await fetchCategories();
  fetchProducts();
});

watch(() => route.query, (newQuery) => {
  sortBy.value = (newQuery.sortBy as string) || 'views_desc';
  categoryName.value = (newQuery.categoryName as string) || '';
  fetchProducts();
});
</script>

<style scoped>
.sort-container {
  margin-left: 17%;
  margin-bottom: 4vh;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1rem;
}

.category-filter {
  margin-left: 17%;
  margin-bottom: 4vh;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1rem;
}

.cards-container {
  display: flex;
  gap: 4vw;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
