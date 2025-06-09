<template>
  <div class="page-container">
    <div class="product-section">
      <div class="product-images-container">
        <div class="main-image">
          <ModelViewer :modelPath=modelPath class="modal-content" />
        </div>
        <div class="secondary-image-carousel-container">
          <img v-for="image in product?.productImages" :key="image.id" :src="image.url" class="secondary-image" />
        </div>
      </div>
      <div class="product-info-container">
        <h1>{{ product?.name }}</h1>
        <p>R$ {{ product?.price }}, valor aproximado para <br> peça de 15cm</p>
        <div class="product-buttons-container">
          <button class="button">Encomendar</button>
          <button class="cart-button" :class="{ animated: cartButtonAnimated }" @click="addToCart">
            <img src="/icons/add-to-shopping-cart.svg" class="cart-icon">
          </button>
        </div>
      </div>
    </div>
    <div class="description-section">
      <hr class="divider" />
      <div class="product-description">
        <div class="medium-title">
          <img src="/icons/note-text.svg" alt="Ícone" class="description-icon" />
          Descrição do produto
        </div>
        <p>{{ product?.description }}</p>
      </div>
      <div class="another-products-section">
        <hr class="divider" />
        <div class="small-title">Outros produtos</div>
      </div>
      <div class="cards-container">
        <ProductCard v-for="product in mostAcessedProducts" :key="product.id" v-if="mostAcessedProducts"
          :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '../services/productService';
import type { ProductDTO } from '../dtos/productDto';
import ProductCard from '../components/ProductCard.vue';
import ModelViewer from '../components/threejs/ModelViewer.vue';

const route = useRoute();
const product = ref<ProductDTO | null>(null);
const products = ref<ProductDTO[]>([]);
const modelPath = "/models/axolot.stl"
const mostAcessedProducts = ref<ProductDTO[]>([]);


const cartButtonAnimated = ref(false);

const addToCart = () => {
  if (!product.value) return;
  const minimalProduct = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    description: product.value.description,
    image: product.value.productImages?.[0]?.url || '',
    quantity: 1
  };
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingIndex = cart.findIndex((item: any) => item.id === minimalProduct.id);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(minimalProduct);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  // Dispara evento para atualizar o Header e outros componentes reativos
  window.dispatchEvent(new Event('storage'));

  cartButtonAnimated.value = true;
  setTimeout(() => {
    cartButtonAnimated.value = false;
  }, 600);
};

onMounted(async () => {
  const id = route.params.id as string;
  const fetchedProduct = await productService.getById(id);
  const capybara = {
    ...fetchedProduct,
    id: 'mock-2',
    name: 'Capivara',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: '/images/capybara.png' } : { ...img }
    )
  };

  const skull = {
    ...fetchedProduct,
    id: 'mock-3',
    name: 'Caveira',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: '/images/skull.png' } : { ...img }
    )
  };

  products.value = [
    skull,
    capybara,
  ];
  try {
    product.value = await productService.getById(id);
    mostAcessedProducts.value = await productService.list();
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
  }
});
</script>

<style scoped>
.product-buttons-container {
  display: flex;
  gap: 10px;
}

.cards-container {
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
  justify-content: space-between;
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
  transition: transform 0.1s ease, background-color 0.1s ease, box-shadow 0.2s;
  position: relative;
}

.cart-button:hover {
  transform: scale(1.08);
  background-color: #999999;
  box-shadow: 0 0 0 4px #e0e0e0;
}

.cart-button.animated {
  animation: cart-bounce 0.6s;
  background-color: #7ed957 !important;
  box-shadow: 0 0 0 8px #b6f7b0;
}

@keyframes cart-bounce {
  0%   { transform: scale(1); }
  20%  { transform: scale(1.15); }
  40%  { transform: scale(0.95); }
  60%  { transform: scale(1.08); }
  80%  { transform: scale(0.98); }
  100% { transform: scale(1); }
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
  width: calc(33.33% - 8.49px);
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  transition: transform 0.2s;
  border: 2px solid #AFB1B6;
}

.secondary-image:hover {
  transform: scale(1.05);
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

.button {
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
