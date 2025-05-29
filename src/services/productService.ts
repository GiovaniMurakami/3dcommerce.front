import axios from 'axios';
import type { ProductDTO } from '../dtos/productDto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const productService = {
  async getById(id: string): Promise<ProductDTO> {
    return Promise.resolve({
      id,
      name: 'Axolote 3D',
      price: 49.99,
      description: 'Encante-se com nosso modelo 3D de axolote, um dos anfíbios mais curiosos e adorados do mundo. Este modelo captura os detalhes únicos do axolote, como suas expressivas brânquias externas e seu sorriso característico. Perfeito para decoração, presentes criativos ou colecionadores apaixonados por animais exóticos. O design foi pensado para realçar texturas suaves e formas orgânicas, garantindo uma impressão 3D de alta qualidade. Ideal para impressão em diversos tamanhos, mantendo os detalhes e proporções. Leve um pedacinho da natureza para sua casa ou escritório com este modelo encantador. Uma peça que combina fofura, biologia e arte em um só objeto.',
      fileUrl: 'https://via.placeholder.com/400',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '123e4567-e89b-12d3-a456-426614174000',
      categoryId: '456e4567-e89b-12d3-a456-426614174000',
      productImages: [
        { id: '1', url: '/images/axolot1.png', type: 'main' },
        { id: '2', url: '/images/axolot2.png', type: 'secondary' },
        { id: '3', url: '/images/axolot3.png', type: 'secondary' }
      ]
    });
  }
};
