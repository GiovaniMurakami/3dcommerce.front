<template>
  <div>
    <div class="product-section">
      <div class="product-images-container">
        <div class="main-image">
          <img :src="product?.productImages[0].url" alt="Product Image" class="main-image-img"/>
        </div>
        <div class="image-footer">
        </div>
      </div>
      <div class="product-info-container">
        <h1>{{ product?.name }}</h1>
        <p>R$ {{ product?.price }}</p>
        <button>Adicionar ao carrinho</button>
      </div>
    </div>
    <div class="description-section">
      <hr class="divider"/>
      <div class="product-description">
        <p>{{ product?.description }}</p>
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
.product-section {
  margin-left: 15%;
  margin-right: 15%;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.product-images-container {
  width: 50%;
}

.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0;
}

.main-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info-container {
  width: 50%;
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center;
}

.product-description {
  width: 50%;
    p {
      margin: 0;
    }
  }

  .description-section {
    margin: 0 10%;
  }
</style>
