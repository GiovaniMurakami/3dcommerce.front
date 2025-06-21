<template>
  <div class="product-scroll-container">
    <div
      class="product-item"
      v-for="product in products"
      :key="product.id"
      @click="goToCategory(product.categoryName)"
    >
      <img :src="product.productImages[0]?.url" :alt="product.name" />
      <p class="product-name">{{ product.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { ProductDTO } from '../dtos/productDto';

const props = defineProps<{
  products: ProductDTO[];
}>();

const router = useRouter();

function goToProduct(id: string) {
  router.push(`/products/${id}`);
}

function goToCategory(categoryName: string) {
  router.push({ path: '/products', query: { categoryName } });
}

</script>

<style scoped>


.product-scroll-container {
  justify-content: center;
  display: flex;
  height: 28vh;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  cursor: pointer;
  gap: 64px;
}

.product-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.product-scroll-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.product-item {
  min-width: 140px;
  width: 25%;
  border-radius: 8px;
  padding: 12px;
  padding-bottom: 32px;
  text-align: center;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D9D9D9;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 4px;
    height: 90%;
  }
  p {
    font-size: 14px;
    font-weight: bold;
    background-color: #ADADAD;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.product-item:hover {
  transform: scale(1.05);
}

</style>
