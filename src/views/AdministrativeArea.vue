<template>
    <div class="admin-area-outer">
        <div class="admin-area-container">
            <h1 class="admin-title">Área Administrativa</h1>
            <button class="create-product-btn" @click="goToCreateProduct">
                Criar Produto
            </button>
            <button class="manage-category-btn" @click="goToManageCategories">
                Gerenciar Categorias
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

onMounted(async () => {
    try {
        const response = await api.get('/me')
        if (!response.data || response.data.role !== 'ADMIN') {
            router.push('/')
        }
    } catch (e) {
        router.push('/login')
    }
})

function goToCreateProduct() {
    router.push('/createproduct')
}

function goToManageCategories() {
    router.push('/managecategories')
}
</script>

<style scoped>
.admin-area-outer {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
    padding: 32px 0;
}

.admin-area-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
}

.admin-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #2d3a4b;
    letter-spacing: 1px;
    text-align: center;
}

.create-product-btn,
.manage-category-btn {
    background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
    transition: background 0.3s, box-shadow 0.3s;
    margin-top: 1rem;
}

.create-product-btn:hover,
.manage-category-btn:hover {
    background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}
</style>