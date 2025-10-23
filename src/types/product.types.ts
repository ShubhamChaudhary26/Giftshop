// types/product.types.ts

// types/product.types.ts
// types/product.types.ts
export interface Product {
  id: number;
  title: string;
  description?: string;
  author?: string;
  src_url?: string;
  srcUrl?: string;
  image_url?: string;
  gallery?: string[];
  price: number;
  discount?: {
    amount: number;
    percentage: number;
  };
  discount_amount?: number;
  discount_percentage?: number;
  rating?: number;
  category?: string; // Keep for backward compatibility
  subcategory?: string; // Keep for backward compatibility
  category_id?: number; // ✅ NEW
  subcategory_id?: number; // ✅ NEW
  stock?: number;
  is_new_arrival?: boolean;
  is_featured?: boolean;
  is_top_selling?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type Discount = {
  amount: number;
  percentage: number;
};