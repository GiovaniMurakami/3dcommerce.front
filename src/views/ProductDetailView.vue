<template>
  <div>
    <div class="product-section">
      <div class="product-images-container">
        <div class="main-image">
          <img :src="product?.productImages[0].url" alt="Product Image" />
        </div>
      </div>
      <div class="product-info-container">
        <h1>{{ product?.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '../services/productService';
import type { ProductDTO } from '../dtos/productDto';

const route = useRoute();
const product = ref<ProductDTO | null>(null);

onMounted(async () => {
  const id = route.params.id as string;
  try {
    product.value = await productService.getById(id);
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
  }
});
</script>

<style scoped>

</style>
