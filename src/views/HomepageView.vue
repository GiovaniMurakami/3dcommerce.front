<template>
  <div class="page-container">
    <div class="product-section">
      <div class="product-info-container">
        <div class="title">Destaque</div>
        <div class="product-name">{{ product?.name }}</div>
        <div class="description">Encante-se com nosso Axolote em impressão 3D, uma peça cheia de charme e personalidade.
          Seu design detalhado destaca as brânquias externas e o sorriso característico desse anfíbio único</div>
        <div class="product-buttons-container">
        </div>
      </div>
      <div class="product-images-container">
        <img src="/images/axolot3.png" alt="" class="main-image">
      </div>
    </div>
    <div class="description-section">
      <hr class="divider" />
      <div class="most-accessed-categories">Categorias mais acessadas</div>
      <ProductImageCarousel :products="products" />
      <hr class="divider" />
      <div class="best-sellers">Mais acessados</div>
      <div class="cards-container" v-if="withoutMock">
        <ProductCard v-for="product in withoutMock" :key="product.id" :product="product" />
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '../services/productService';
import { type ListProductDTO, type ListProductsResponse, type ProductDTO } from '../dtos/productDto';
import ProductImageCarousel from '../components/ProductImageCarousel.vue';
import ProductCard from '../components/ProductCard.vue';

const product = ref<ProductDTO | null>(null);
const products = ref<ProductDTO[]>([]);
const withoutMock = ref<ListProductsResponse | null>(null);

onMounted(async () => {

  try {
    withoutMock.value = await productService.list({
      sortBy: "views",
      sortDir: "desc",
    });
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
  }
});
</script>

<style scoped>
.product-name {
  font-size: 22px;
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  background-color: #ADADAD;
  border-radius: 12px;
  padding: 0 16px;
  width: fit-content;
  align-items: center;
}

.cards-container {
  display: flex;
  gap: 4vw;
  flex-wrap: wrap;
  justify-content: center;
}

.most-accessed-categories {
  font-size: 22px;
  background-color: #ADADAD;
  border-radius: 12px;
  padding: 0 16px;
  width: fit-content;
  align-items: center;
  margin-left: 2vw;
}

.best-sellers {
  font-size: 22px;
  background-color: #ADADAD;
  border-radius: 12px;
  padding: 0 16px;
  width: fit-content;
  margin-bottom: 15px;
  margin-left: 6.5vw;
}

.product-buttons-container {
  display: flex;
  gap: 10px;
}

.cart-icon {
  height: 30px;
  width: 30px;
}

.cart-button {
  padding: 16px 32px;
  border-radius: 10px;
  border: none;
  background-color: #ADADAD;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 1%;
  line-height: 24px;
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.1s ease;
}

.page-container {
  margin: 8vh 0;
}


.product-section {
  margin-left: 15%;
  margin-right: 15%;
  display: flex;
  gap: 8rem;
  align-items: center;
}

.product-images-container {
  width: 70%;
}

.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0;
}

.main-image {
  width: 100%;
  aspect-ratio: 1 / 0.7;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #AFB1B6;
}

.main-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info-container {
  width: 30%;
  margin-top: 0px;
  margin-bottom: 60px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin: 0px 0;
  }

  p {
    margin: 0;
  }

  button {
    margin-top: 64px;
  }
}

.medium-title {
  font-size: 28px;
  background-color: #ADADAD;
  border-radius: 12px;
  padding: 0 16px;
  width: fit-content;
  margin-bottom: 22px;
  align-items: center;
  display: flex;
}

.description-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.small-title {
  font-size: 24px;
  background-color: #ADADAD;
  border-radius: 12px;
  padding: 0 16px;
  width: fit-content;
  align-items: center;
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


.product-scroll-container {
  display: flex;
  gap: 5rem;
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

.button {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background-color: #ADADAD;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 1%;
  line-height: 24px;
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.1s ease;
}

.button:hover {
  transform: scale(1.05);
  background-color: #999999;
}

.cart-button:hover {
  transform: scale(1.05);
  background-color: #999999;
}

.model-wrapper {
  width: 30vw;
  height: 30vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>