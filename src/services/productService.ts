import axios from 'axios';
import type { ApiResponse, ListProductDTO, ListProductsResponse, ProductDTO } from '../dtos/productDto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type ListProductsParams = {
  page?: number;
  limit?: number;
  name?: string;
  categoryId?: string;
  categoryName?: string;
  sortBy?: "createdAt" | "name" | "price" | "views";
  sortDir?: "asc" | "desc";
};

export const productService = {
  async getById(id: string): Promise<ProductDTO> {
    const response =  await api.get<ProductDTO>(`/products/${id}`);
    return response.data;
  },

  async list(params?: ListProductsParams): Promise<ListProductsResponse> {
    const response = await api.get<ApiResponse<ListProductsResponse>>("/products", { params });
    return response.data.data;
  }
  /* Promise.resolve([
    {
      id: '1',
      name: 'Axolote',
      quantity: 1,
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
      name: 'Caveira',quantity: 1,
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
      price: 39.99,quantity: 1,
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
      price: 39.99,quantity: 1,
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
      price: 39.99,quantity: 1,
      description: 'Escultura de mão impressa em 3D, excelente para decoração artística ou apoio de acessórios.',
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
      price: 39.99,quantity: 1,
      description: 'Escultura de duas mãos unidas, simbolizando afeto e união. Ideal para presentear ou decorar.',
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
      price: 39.99,quantity: 1,
      description: 'Pingente com design de relâmpago, leve e moderno, perfeito para colares ou chaveiros personalizados.',
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
      price: 39.99,quantity: 1,
      description: 'Estatueta de cachorro com estilo rústico, ideal para compor ambientes aconchegantes e temáticos.',
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
  ]) */

};