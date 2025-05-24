export interface ProductImageDTO {
  id: string;
  url: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  categoryId: string;
  productImages: ProductImageDTO[];
}
