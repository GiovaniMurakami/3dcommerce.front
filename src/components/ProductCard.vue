<template>
  <div class="product-card-container" @click="goToProduct(product.id)">
    <img class="product-card-image" :src="product.productImages[0]?.url" :alt="product.name" />
    <div class="product-info-container">
      <div class="product-category">
        <p>{{ product.category }}</p>
      </div>
      <p>{{ product.name }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { ProductDTO } from '../dtos/productDto';

const props = defineProps<{
  product: ProductDTO;
}>();

const router = useRouter();

function goToProduct(id: string) {
  router.push(`/products/${id}`);
}
</script>

<style scoped>
.product-card-container {
  border: 1px solid #ccc;
  width: 16.67%;
  border-radius: 10px;
}

.product-card-image {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px;
}

.product-info-container {
  margin: 2vh;
  font-size: 1.3vh;
}

.product-category {
  padding: 0 0.5rem;
  background-color: #ADADAD;
  border-radius: 20px;
  width: 5vw;
  margin: 0;
  height: fit-content;
  font-weight: bold;
  border: 1px solid rgba(0, 0, 0, 0.25);
  p {
    margin: 0;
    margin-left: 0.2rem;
  }
}
</style>
