<template>
  <div class="page-container">
    <div class="product-section">
      <div class="product-images-container">
        <div class="main-image">
          <img :src="product?.productImages[0].url" alt="Product Image" class="main-image-img" />
        </div>
        <div class="secondary-image-carousel-container">
          <img v-for="image in product?.productImages" :key="image.id" :src="image.url" class="secondary-image" />
        </div>
      </div>
      <div class="product-info-container">
        <h1>{{ product?.name }}</h1>
        <p>R$ {{ product?.price }}</p>
        <button>Adicionar ao carrinho</button>
      </div>
    </div>
    <div class="description-section">
      <hr class="divider" />
      <div class="product-description">
        <p>{{ product?.description }}</p>
      </div>
      <div class="another-products-section">
        <hr class="divider" />
        <h1>Outros produtos</h1>
        <ProductImageCarousel :products="products" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '../services/productService';
import type { ProductDTO } from '../dtos/productDto';
import ProductImageCarousel from '../components/ProductImageCarousel.vue';

const route = useRoute();
const product = ref<ProductDTO | null>(null);
const products = ref<ProductDTO[]>([]);

onMounted(async () => {
  const id = route.params.id as string;
  const fetchedProduct = await productService.getById(id);
  product.value = fetchedProduct;

  products.value = [
    fetchedProduct,
    { ...fetchedProduct, id: 'mock-2' },
    { ...fetchedProduct, id: 'mock-3' }
  ];
  try {
    product.value = await productService.getById(id);
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
  }
});
</script>

<style scoped>
.page-container {
  margin: 8vh 0;
}

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

.secondary-image-carousel-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-top: 0.75rem;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  cursor: pointer;
}

.secondary-image-carousel-container::-webkit-scrollbar {
  height: 6px;
}

.secondary-image-carousel-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.secondary-image {
  width: 30%;
  height: 30%;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.secondary-image:hover {
  transform: scale(1.1);
}

.product-info-container {
  width: 50%;
  margin-top: 0px;
  margin-bottom: 60px;
  margin-left: 30px;
  margin-right: 30px;
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

.another-products-section {
  width: 50%;

  p {
    margin: 0;
  }
}

.product-scroll-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: #ccc transparent;
  /* Firefox */
}

.product-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.product-scroll-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.product-item {
  min-width: 120px;
  flex: 0 0 auto;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
}

.product-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4px;
}

.product-item p {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
</style>
