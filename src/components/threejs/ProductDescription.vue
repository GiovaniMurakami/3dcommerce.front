<template>
  <div class="product-info">
    <h1 class="title">{{ title }}</h1>
    <p class="description">{{ description }}</p>
    <ul class="details">
      <li><strong>Tamanho:</strong> {{ size }}</li>
      <li><strong>Material:</strong> {{ material }}</li>
      <li><strong>Cor:</strong> {{ color }}</li>
    </ul>
    <button class="order-button" @click="onOrderClick">Pedir Encomenda</button>
  </div>
</template>

<script>
export default {
  name: 'ProductDescription',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    onOrderClick: { type: Function, default: () => {} }
  }
};
</script>
  
  <style scoped>
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    width: 100%;
    background-color: black;
    padding: 30px;
    align-self: center;
    border-radius: 5%;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .description {
    font-size: 1rem;
    line-height: 1.5;
    color: white;
  }
  
  .details {
    list-style: none;
    padding: 0;
    font-size: 0.95rem;
    color: #555;
  }
  
  .details li {
    margin-bottom: 0.3rem;
  }
  
  .order-button {
    background-color: #ff6f61;
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .order-button:hover {
    background-color: #e85c4f;
  }
  </style>
  