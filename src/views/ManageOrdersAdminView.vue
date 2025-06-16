<template>
    <div class="orders-outer">
        <div class="orders-container">
            <h1 class="orders-title">Gerenciar Pedidos (Admin)</h1>
            <div v-if="loading" class="loading">Carregando...</div>
            <div v-else>
                <div v-if="orders.length" class="orders-list">
                    <div v-for="order in orders" :key="order.id" class="order-item">
                        <div class="order-header">
                            <span class="order-id">Pedido #{{ order.id }}</span>
                            <span class="order-status">Status: {{ statusLabel(order.currentStatus) }}</span>
                            <span class="order-date">{{ formatDate(order.createdAt) }}</span>
                        </div>
                        <div class="order-products">
                            <div v-for="item in order.orderItem" :key="item.id" class="order-product">
                                <img v-if="products[item.productId]?.mainImageUrl"
                                    :src="products[item.productId].mainImageUrl" class="order-product-img"
                                    :alt="products[item.productId].name" />
                                <div>
                                    <div class="order-product-name">
                                        {{ products[item.productId]?.name || 'Produto' }}
                                    </div>
                                    <div class="order-product-price">
                                        R$ {{ Number(item.price).toFixed(2) }} x {{ item.quantity }}
                                    </div>
                                    <div class="order-product-desc" v-if="products[item.productId]?.description">
                                        {{ products[item.productId].description }}
                                    </div>
                                    <div class="order-product-category" v-if="products[item.productId]?.category?.name">
                                        Categoria: {{ products[item.productId].category.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-total">
                            <strong>Total:</strong>
                            R$
                            {{
                                order.orderItem
                                    .reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)
                                    .toFixed(2)
                            }}
                        </div>
                        <div class="order-status-edit">
                            <label for="status">Alterar status:</label>
                            <select :value="order.currentStatus"
                                @change="e => updateOrderStatus(order.id, e.target.value)"
                                :disabled="statusLoading[order.id]">
                                <option value="WAITING_CONFIRMATION">Aguardando Confirmação</option>
                                <option value="PRINTING">Imprimindo</option>
                                <option value="SHIPPED">Enviado</option>
                                <option value="DELIVERED">Entregue</option>
                                <option value="CANCELED">Cancelado</option>
                            </select>
                            <span v-if="statusLoading[order.id]" class="status-loading">Salvando...</span>
                            <span v-if="statusError[order.id]" class="status-error">{{ statusError[order.id] }}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Nenhum pedido encontrado.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import api from '../services/api'

const orders = ref([])
const loading = ref(false)
const products = ref({})
const statusLoading = reactive({})
const statusError = reactive({})

onMounted(fetchOrders)

async function fetchOrders() {
    loading.value = true
    try {
        const token = localStorage.getItem('accessToken')
        const response = await api.get('/orders', {
            headers: { Authorization: `Bearer ${token}` }
        })
        orders.value = response.data.data || []

        // Buscar detalhes dos produtos de todos os pedidos
        const productIds = [
            ...new Set(
                orders.value.flatMap(order =>
                    order.orderItem.map(item => item.productId)
                )
            )
        ]
        for (const id of productIds) {
            try {
                const prodRes = await api.get(`/products/${id}`)
                const product = prodRes.data
                products.value[id] = {
                    ...product,
                    mainImageUrl: product.productImages?.find(img => img.type === 'main')?.url || '',
                }
            } catch (e) {
                products.value[id] = {}
            }
        }
    } catch (e) {
        orders.value = []
    } finally {
        loading.value = false
    }
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR')
}

function statusLabel(status) {
    switch (status) {
        case 'WAITING_CONFIRMATION': return 'Aguardando Confirmação'
        case 'PRINTING': return 'Imprimindo'
        case 'SHIPPED': return 'Enviado'
        case 'DELIVERED': return 'Entregue'
        case 'CANCELED': return 'Cancelado'
        default: return status
    }
}

async function updateOrderStatus(orderId, newStatus) {
    statusLoading[orderId] = true
    statusError[orderId] = ''
    try {
        const token = localStorage.getItem('accessToken')
        await api.patch(`/orders/${orderId}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        // Atualiza localmente o status do pedido
        const order = orders.value.find(o => o.id === orderId)
        if (order) order.currentStatus = newStatus
    } catch (e) {
        statusError[orderId] = 'Erro ao atualizar status.'
    } finally {
        statusLoading[orderId] = false
    }
}
</script>

<style scoped>
.orders-outer {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
    padding: 32px 0;
}

.orders-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
    display: flex;
    flex-direction: column;
}

.orders-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #2d3a4b;
    letter-spacing: 1px;
    text-align: center;
}

.loading {
    text-align: center;
    font-size: 1.1rem;
    color: #888;
}

.orders-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.order-item {
    background: #f3f3f3;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(31, 38, 135, 0.06);
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.order-id {
    font-weight: bold;
}

.order-status {
    color: #4caf50;
    font-weight: 500;
}

.order-date {
    color: #888;
    font-size: 0.95rem;
}

.order-products {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.order-product {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    box-shadow: 0 1px 4px rgba(31, 38, 135, 0.05);
}

.order-product-img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    background: #e5e5e5;
}

.order-product-name {
    font-weight: 500;
}

.order-product-price {
    color: #222;
    font-size: 1rem;
}

.order-product-desc {
    color: #555;
    font-size: 0.95rem;
    margin-top: 2px;
}

.order-product-category {
    color: #888;
    font-size: 0.92rem;
    margin-top: 2px;
}

.order-total {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: right;
}

.order-status-edit {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
}

.order-status-edit label {
    font-weight: 500;
    color: #2d3a4b;
}

.order-status-edit select {
    padding: 0.4rem 1rem;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    font-size: 1rem;
    background: #f7f7f7;
    transition: border-color 0.2s;
}

.order-status-edit select:focus {
    border-color: #4caf50;
    outline: none;
}

.status-loading {
    color: #4caf50;
    font-size: 0.95rem;
    margin-left: 8px;
}

.status-error {
    color: #e53935;
    font-size: 0.95rem;
    margin-left: 8px;
}
</style>