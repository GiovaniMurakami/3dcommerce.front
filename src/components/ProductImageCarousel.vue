<template>
  <div class="product-scroll-container">
    <div
      class="product-item"
      v-for="product in products"
      :key="product.id"
      @click="goToProduct(product.id)"
    >
      <img :src="product.productImages[0]?.url" :alt="product.name" />
      <p>{{ product.name }}</p>
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

</script>

<style scoped>
.product-scroll-container {
  display: flex;
  width: 80vw;
  height: 28vh;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  cursor: pointer;
  gap: 36px;
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
  flex: 0 0 auto;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4px;
  height: 100%;
}

.product-item p {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
</style>
