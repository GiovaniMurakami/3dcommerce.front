<template>
  <div class="description-section">
    <hr class="divider" />
    <div class="most-accessed-categories">Carrinho</div>

    <div class="cart-container">
      <div class="cart-list" v-if="products.length">
        <div class="cart-list-content">
          <div class="cart-items">
            <div v-for="(product, index) in products" :key="product.id" class="cart-item">
              <img 
                :src="product.productImages?.[0]?.url || 'https://via.placeholder.com/60'" 
                alt="Imagem do produto" 
                class="cart-image" 
              />
              <div class="cart-quantity-controls">
                <button @click="decreaseQuantity(index)">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <div class="cart-details">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-desc">{{ product.description || 'Sem descrição disponível.' }}</p>
                <p class="product-price">R$ {{ (product.price * product.quantity).toFixed(2) }}</p>
                <button @click="removeItem(index)" class="button">Remover</button>
              </div>
            </div>
          </div>
          <div class="cart-total">
            <strong>Total:</strong>
            <strong class="total-value">R$ {{ totalCartValue.toFixed(2) }}</strong>
            <button @click="buy" class="buy-button">Comprar</button>
          </div>
        </div>
      </div>
      
      <div v-else>
        <p>Carrinho vazio.</p>
      </div>
    </div>

    <hr class="divider" />
    <div class="another-products-section">
      <div class="most-accessed-categories">Outros produtos</div>
    </div>
    
    <div class="cards-container">
      <ProductCard 
        v-for="product in mostAcessedProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '../services/productService'
import type { ProductDTO } from '../dtos/productDto'
import ProductCard from '../components/ProductCard.vue';
 
const route = useRoute()
const mostAcessedProducts = ref<ProductDTO[]>([]);
const product = ref<ProductDTO | null>(null);
const products = ref<ProductDTO[]>([]);
 
onMounted(async () => {
  const id = route.params.id as string;
  const fetchedProduct = await productService.getById(id);
  const capybara = {
    ...fetchedProduct,
    id: 'mock-2',
    quantity: 1,
    name: 'Capivara',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: '/images/capybara.png' } : { ...img }
    )
  };

  const skull = {
    ...fetchedProduct,
    id: 'mock-3',
    quantity: 1,
    name: 'Caveira',
    productImages: fetchedProduct.productImages.map((img, index) =>
      index === 0 ? { ...img, url: '/images/skull.png' } : { ...img }
    )
  };
  
  products.value = [capybara, skull];

  try {
    product.value = await productService.getById(id);
    mostAcessedProducts.value = await productService.list();
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
  }
});

function increaseQuantity(index: number) {
  products.value[index].quantity = (products.value[index].quantity || 1) + 1;
}
 
function decreaseQuantity(index: number) {
  if (products.value[index].quantity && products.value[index].quantity > 1) {
    products.value[index].quantity--;
  }
}
 
function removeItem(index: number) {
  products.value.splice(index, 1);
}
 
const totalCartValue = computed(() =>
  products.value.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
);

function buy() {
  const messageItems = products.value.map(product => {
    const totalItem = (product.price * product.quantity).toFixed(2);
    return `${product.name}:\nQuantidade: ${product.quantity}\nValor: R$ ${totalItem}`;
  }).join('\n\n');

  const totalCompra = totalCartValue.value.toFixed(2);
  const message = `
Olá, Gostaria de fazer um pedido!\n\nDescrição de itens:\n\n${messageItems}\n\nTotal: R$ ${totalCompra}
`.trim();

  const whatsappNumber = '5519997585697';
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(url, '_blank');
}
</script>
 
<style scoped>
.divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0;
}

.most-accessed-categories {
  font-size: 22px;
  border-radius: 12px;
  padding: 0 16px;
  margin-bottom: 15px;
  font-weight: bold;
}

.description-section {
  margin: 0 10%;
}

.cart-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.cart-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  flex-grow: 1;
}

.cart-list-content {
  display: flex;
  gap: 24px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 12px;
}

.cart-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-quantity-controls button {
  width: 32px;
  height: 32px;
  font-size: 18px;
  background-color: #ADADAD;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-details {
  flex-grow: 1;
}

.product-name {
  font-weight: bold;
  margin: 0;
}

.product-desc {
  font-size: 0.9rem;
  color: gray;
  margin: 6px 0;
}

.product-price {
  font-size: 1rem;
  color: #222;
  margin: 4px 0;
}

.cart-total {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
}

.cart-total strong {
    margin-bottom: 5px;
    display: block;
}

.total-value {
    margin-top: 5px;
}

.button {
  padding: 4px 12px;
  border-radius: 8px;
  background-color: #ADADAD;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #999999;
}

.buy-button {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #ADADAD;
  border: none;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #999999;
}

.another-products-section {
  margin-top: 40px;
}

.cards-container {
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>