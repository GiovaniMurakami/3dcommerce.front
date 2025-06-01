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
      description: 'Encante-se com nosso Axolote em impressão 3D, uma peça cheia de charme e personalidade. Seu design detalhado destaca as brânquias externas e o sorriso característico desse anfíbio único. Ideal para decoração, colecionadores ou presentes criativos e diferentes. Leve um pedacinho da natureza para sua casa, feito com alta qualidade e muito carinho.',
      category: 'Animais',
      fileUrl: 'https://via.placeholder.com/400',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '123e4567-e89b-12d3-a456-426614174000',
      categoryId: '456e4567-e89b-12d3-a456-426614174000',
      productImages: [
        { id: '1', url: '/images/axolot1.png', type: 'main' },
        { id: '2', url: '/images/axolot2.png', type: 'secondary' },
        { id: '3', url: '/images/axolot3.png', type: 'secondary' },
      ],
    });
  },

  async list(): Promise<ProductDTO[]> {
    return Promise.resolve([
      {
        id: '1',
        name: 'Axolote',
        price: 49.99,
        description: 'Modelo 3D de axolote, fofo e detalhado.',
        category: 'Animais',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174000',
        productImages: [
          { id: '1', url: '/images/axolot1.png', type: 'main' },
        ],
      },
      {
        id: '2',
        name: 'Caveira',
        price: 59.99,
        description: 'Modelo de caveira realista em 3D.',
        category: 'Decoração',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174001',
        productImages: [
          { id: '2', url: '/images/skull.png', type: 'main' },
        ],
      },
      {
        id: '3',
        name: 'Capivara',
        price: 39.99,
        description: 'Modelo estilizado de capivara em 3D.',
        category: 'Animais',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: '/images/capybara.png', type: 'main' },
        ],
      },
      {
        id: '4',
        name: 'Caneca',
        price: 39.99,
        description: 'Caneca para utilizar no dia a dia',
        category: 'Utensílios',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: 'https://images.free3d.com/imgd/l18/5d98721f26be8b18398b4567/5020-tea-mug-.png', type: 'main' },
        ],
      },
      {
        id: '5',
        name: 'Mão decorativa',
        price: 39.99,
        description: 'Caneca para utilizar no dia a dia',
        category: 'Decoração',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: 'https://images.free3d.com/imgd/l33/866433.jpg', type: 'main' },
        ],
      },
      {
        id: '6',
        name: 'De mãos dadas',
        price: 39.99,
        description: 'Caneca para utilizar no dia a dia',
        category: 'Decoração',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: 'https://images.free3d.com/imgd/l3/1200503.jpg', type: 'main' },
        ],
      },
      {
        id: '7',
        name: 'Pingente relâmpago',
        price: 39.99,
        description: 'Caneca para utilizar no dia a dia',
        category: 'Acessórios',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: 'https://images.free3d.com/imgd/l55/1251455.jpg', type: 'main' },
        ],
      },
      {
        id: '8',
        name: 'Cachorro da fazenda',
        price: 39.99,
        description: 'Caneca para utilizar no dia a dia',
        category: 'Animais',
        fileUrl: 'https://via.placeholder.com/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '456e4567-e89b-12d3-a456-426614174002',
        productImages: [
          { id: '3', url: 'https://images.free3d.com/imgd/l45/800545.jpg', type: 'main' },
        ],
      }
    ]);
  },
};