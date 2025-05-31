<template>
  <div class="page-container">
    <div class="product-section">
      <div class="product-info-container">
        <h1>Destaque da semana</h1>
        <h1>{{ product?.name }}</h1>
        <div class="product-buttons-container">
          <button class="button">Detalhes</button>
        </div>
      </div>
      <div class="product-images-container">
        <img src="/images/skull.png" alt="" class="main-image">
      </div>
    </div>
    <div class="description-section">
      <hr class="divider" />
      <div>Categorias mais acessadas</div>
        <ProductImageCarousel :products="products" />
      <hr class="divider" />
      <div>Mais vendidos</div>
        <ProductCard v-if="product" :product="product"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '../services/productService';
import type { ProductDTO } from '../dtos/productDto';
import ProductImageCarousel from '../components/ProductImageCarousel.vue';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const product = ref<ProductDTO | null>(null);
const products = ref<ProductDTO[]>([]);

onMounted(async () => {
  const id = route.params.id as string;
  const fetchedProduct = await productService.getById(id);
  
  const capybara = {
    ...fetchedProduct,
    id: 'mock-2',
    name: 'Animes',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: 'https://i.etsystatic.com/50958232/r/il/da0600/5855239846/il_fullxfull.5855239846_bezk.jpg' } : { ...img }
    )
  };

  const skull = {
    ...fetchedProduct,
    id: 'mock-3',
    name: 'Animais',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: 'https://things.3dfila.com.br/img/54910.jpg' } : { ...img }
    )
  };

    const axolot = {
    ...fetchedProduct,
    id: 'mock-4',
    name: 'Games',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/09/24/954367/368341/kirby_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3822958.jpg' } : { ...img }
    )
  };

  products.value = [
    capybara,
    skull,
    axolot
  ];
  try {
    product.value = await productService.getById(id);
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
