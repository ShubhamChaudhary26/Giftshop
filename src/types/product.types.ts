// types/product.types.ts
export interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price: number;
  discount: {
    amount: number;
    percentage: number;
  };
  rating: number;
  author?: string;
  category?: string;
  stock?: number;
  description?: string; // Add this
  is_new_arrival?: boolean;
  is_top_selling?: boolean;
}