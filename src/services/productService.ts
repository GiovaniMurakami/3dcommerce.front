import axios from 'axios';
import type { ProductDTO } from '../dtos/productDto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const productService = {
  async getById(id: string): Promise<ProductDTO> {
    return Promise.resolve({
      id,
      name: 'Cat 3D',
      price: 49.99,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      fileUrl: 'https://via.placeholder.com/400',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '123e4567-e89b-12d3-a456-426614174000',
      categoryId: '456e4567-e89b-12d3-a456-426614174000',
      productImages: [
        { id: '1', url: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg', type: 'main' },
        { id: '2', url: 'https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg', type: 'secondary' }
      ]
    });
  }
};
