// types/product.types.ts

export type Product = {
  id: number;
  title: string;
  author?: string;
  description?: string;
  price: number;
  
  // Discount fields (match database)
  discount_amount?: number;
  discount_percentage?: number;
  
  rating?: number;
  
  // Image URLs - Support both naming conventions
  src_url?: string;      // Database column (snake_case)
  srcUrl?: string;       // Mapped data (camelCase)
  image_url?: string;    // Alternative
  gallery?: string[];    // Multiple images
  
  category?: string;
  stock?: number;
  
  // Flags
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_top_selling?: boolean;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  
  // Optional: For backwards compatibility
  discount?: {
    percentage?: number;
    amount?: number;
  };
};

export type Discount = {
  amount: number;
  percentage: number;
};