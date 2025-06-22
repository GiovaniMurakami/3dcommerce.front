<template>
  <div class="description-section">
    <hr class="divider" />
    <div class="most-accessed-categories">Carrinho</div>

    <div class="cart-container">
      <div class="cart-list" v-if="products.length">
        <div class="cart-list-content">
          <div class="cart-items">
            <div v-for="(product, index) in products" :key="product.id" class="cart-item">
              <img :src="product.image || 'https://via.placeholder.com/60'" alt="Imagem do produto"
                class="cart-image" />
              <div class="cart-quantity-controls">
                <button @click="decreaseQuantity(index)" :disabled="product.quantity <= 1">-</button> <span>{{
                  product.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <div class="cart-details">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-desc">{{ product.description || 'Sem descrição disponível.' }}</p>
                <p class="product-price">R$ {{ (product.price * product.quantity).toFixed(2) }}</p>
                <button @click="askRemoveItem(index)" class="button">Remover</button>
              </div>
            </div>
          </div>
          <div class="cart-total">
            <strong>Total:</strong>
            <strong class="total-value">R$ {{ totalCartValue.toFixed(2) }}</strong>
            <button @click="openBuyModal" class="buy-button">Comprar</button>
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
      <template v-if="isLoadingOthers">
        <SkeletonCard v-for="n in 4" :key="n" />
      </template>
      <template v-else-if="mostAcessedProducts.length === 0">
        <p>Nenhum produto encontrado.</p>
      </template>
      <template v-else>
        <ProductCard v-for="product in mostAcessedProducts" :key="product.id" :product="product" />
      </template>
    </div>

  </div>

  <transition name="modal-fade">
    <div v-if="showRemoveModal" class="modal-overlay">
      <div class="modal-content animated-modal">
        <div class="modal-icon modal-remove-icon">
          <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" stroke="#d32f2f" stroke-width="4" fill="#fff5f5" />
            <path d="M15 15l14 14M29 15l-14 14" stroke="#d32f2f" stroke-width="4" stroke-linecap="round" />
          </svg>
        </div>
        <h3>Remover item</h3>
        <p>Tem certeza que deseja remover este item do carrinho?</p>
        <div class="modal-actions modal-actions-row">
          <button @click="confirmRemoveItem" class="modal-confirm">Sim, remover</button>
          <button @click="cancelRemoveItem" class="modal-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </transition>

  <transition name="modal-fade">
    <div v-if="showBuyModal" class="modal-overlay">
      <div class="modal-content animated-modal">
        <div class="modal-icon modal-confirm-icon">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" stroke="#4caf50" stroke-width="4" fill="#eafaf1" />
            <path d="M16 24l6 6 10-10" stroke="#4caf50" stroke-width="4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <h3>Confirmar Pedido</h3>
        <p>
          Seu pedido será registrado e você será redirecionado para o WhatsApp para finalizar a compra.<br>
          Confirma o envio do pedido?
        </p>
        <div class="modal-actions">
          <button @click="confirmBuy" class="buy-button" :disabled="buyLoading">
            {{ buyLoading ? 'Enviando...' : 'Confirmar e ir para WhatsApp' }}
          </button>
          <button @click="closeBuyModal" class="modal-cancel">Cancelar</button>
        </div>
        <div v-if="buyError" class="error-msg">{{ buyError }}</div>
      </div>
    </div>
  </transition>

  <transition name="modal-fade">
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content animated-modal">
        <div class="modal-icon modal-success-icon">
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" stroke="#4caf50" stroke-width="4" fill="#eafaf1" />
            <path d="M18 29l7 7 13-13" stroke="#4caf50" stroke-width="4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <h3>Pedido realizado!</h3>
        <p>
          <span class="success-text">Seu pedido foi registrado com sucesso.</span><br>
          Agora você será redirecionado para o WhatsApp para finalizar a compra.
        </p>
        <div class="modal-actions">
          <button @click="goToWhatsapp" class="buy-button">Ir para WhatsApp</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { productService } from '../services/productService'
import type { ProductDTO } from '../dtos/productDto'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api'
import SkeletonCard from '../components/skeletons/SkeletonCard.vue';

const mostAcessedProducts = ref<ProductDTO[]>([]);
const products = ref<ProductDTO[]>([]);
const showRemoveModal = ref(false);
const removeIndex = ref<number | null>(null);
const isLoadingCart = ref(true);
const isLoadingOthers = ref(true);

const showBuyModal = ref(false);
const buyLoading = ref(false);
const buyError = ref('');
const showSuccessModal = ref(false);
let whatsappUrl = '';

function askRemoveItem(index: number) {
  removeIndex.value = index;
  showRemoveModal.value = true;
}

function confirmRemoveItem() {
  if (removeIndex.value !== null) {
    products.value.splice(removeIndex.value, 1);
    localStorage.setItem('cart', JSON.stringify(products.value));
    window.dispatchEvent(new Event('storage'));
  }
  showRemoveModal.value = false;
  removeIndex.value = null;
}

function cancelRemoveItem() {
  showRemoveModal.value = false;
  removeIndex.value = null;
}

onMounted(() => {
  window.addEventListener('storage', () => {
    products.value = JSON.parse(localStorage.getItem('cart') || '[]');
  });
});

onMounted(async () => {
  try {
    products.value = JSON.parse(localStorage.getItem('cart') || '[]');
  } finally {
    isLoadingCart.value = false;
  }
});

onMounted(async () => {
  try {
    const response = await productService.list({
      limit: 5
    });
    mostAcessedProducts.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  } finally {
    isLoadingOthers.value = false;
  }
});


function increaseQuantity(index: number) {
  products.value[index].quantity = (products.value[index].quantity || 1) + 1;
  localStorage.setItem('cart', JSON.stringify(products.value));
  window.dispatchEvent(new Event('storage'));
}

function decreaseQuantity(index: number) {
  if (products.value[index].quantity && products.value[index].quantity > 1) {
    products.value[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(products.value));
    window.dispatchEvent(new Event('storage'));
  }
}

const totalCartValue = computed(() =>
  products.value.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
);

function openBuyModal() {
  buyError.value = '';
  showBuyModal.value = true;
}
function closeBuyModal() {
  showBuyModal.value = false;
  buyError.value = '';
}

async function confirmBuy() {
  buyLoading.value = true;
  buyError.value = '';
  try {
    const items = products.value.map(product => ({
      productId: product.id,
      quantity: product.quantity
    }));
    const token = localStorage.getItem('accessToken');
    await api.post('/orders', { items }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const messageItems = products.value.map(product => {
      const totalItem = (product.price * product.quantity).toFixed(2);
      return `${product.name}:\nQuantidade: ${product.quantity}\nValor: R$ ${totalItem}`;
    }).join('\n\n');
    const totalCompra = totalCartValue.value.toFixed(2);
    const message = `
Olá, Gostaria de fazer um pedido!\n\nDescrição de itens:\n\n${messageItems}\n\nTotal: R$ ${totalCompra}
`.trim();

    const whatsappNumber = '5519997585697';
    whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    products.value = [];
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));

    showBuyModal.value = false;
    showSuccessModal.value = true;
  } catch (e) {
    buyError.value = 'Erro ao registrar pedido. Verifique se está logado e tente novamente.';
  } finally {
    buyLoading.value = false;
  }
}

function goToWhatsapp() {
  showSuccessModal.value = false;
  window.open(whatsappUrl, '_blank');
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
  background-color: #f9f9fb;
  padding: 18px 16px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, background 0.2s;
}

.cart-item:hover {
  background: #f0f4ff;
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.10);
}

.cart-image {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.cart-quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-quantity-controls button:disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}

.cart-quantity-controls button {
  width: 36px;
  height: 36px;
  font-size: 20px;
  background-color: #e7e7e7;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.cart-quantity-controls button:hover {
  background-color: #007BFF;
  color: #fff;
  transform: scale(1.08);
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
  background: #f7faff;
  padding: 18px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.total-value {
  font-size: 1.3rem;
  color: #007BFF;
  font-weight: bold;
  margin-top: 8px;
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
  padding: 10px 24px;
  border-radius: 8px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.buy-button:hover {
  background-color: #0056b3;
  transform: scale(1.04);
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

/* Modal styles and animations */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.animated-modal {
  animation: pop-in 0.35s cubic-bezier(.68, -0.55, .27, 1.55);
}

@keyframes pop-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }

  80% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

.modal-content {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.13);
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  position: relative;
}

.modal-icon {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: icon-pop 0.5s cubic-bezier(.68, -0.55, .27, 1.55);
}

@keyframes icon-pop {
  0% {
    transform: scale(0.5) rotate(-20deg);
    opacity: 0;
  }

  80% {
    transform: scale(1.1) rotate(5deg);
    opacity: 1;
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

.modal-confirm-icon svg,
.modal-success-icon svg,
.modal-remove-icon svg {
  display: block;
}

.success-text {
  color: #388e3c;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.modal-actions-row {
  flex-direction: row;
  align-items: center;
}

.buy-button,
.modal-confirm,
.modal-cancel {
  height: 40px;
  display: flex;
  align-items: center;
}


.buy-button {
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
}

.buy-button:hover {
  background: #388e3c;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

.modal-cancel {
  background: #bdbdbd;
  color: #222;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.modal-cancel:hover {
  background: #888;
}

.error-msg {
  color: #e53935;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-align: center;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-confirm {
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.modal-confirm:hover {
  background: #b71c1c;
}
</style>