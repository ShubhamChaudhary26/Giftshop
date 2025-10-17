// lib/supabase-products.ts
import { supabase } from './supabase';
import { Product } from '@/types/product.types';

function formatProduct(item: any): Product {
  // Create gallery array - use src_url as fallback
  const gallery = item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0
    ? item.gallery
    : [item.src_url, item.src_url, item.src_url]; // 3 same images as fallback

  return {
    id: item.id,
    title: item.title || '',
    srcUrl: item.src_url || '/images/book1.webp',
    gallery: gallery.filter(Boolean), // Remove null/undefined values
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0
    },
    rating: item.rating || 0,
    author: item.author,
    category: item.category,
    stock: item.stock,
    description: item.description,
    is_new_arrival: item.is_new_arrival,
    is_top_selling: item.is_top_selling
  };
}

// Fetch single product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? formatProduct(data) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .limit(8)
      .order('rating', { ascending: false });

    if (error) throw error;
    return (data || []).map(formatProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Fetch New Arrivals
export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new_arrival', true)
      .limit(8)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(formatProduct);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
}

// Fetch Top Selling
export async function fetchTopSelling(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_top_selling', true)
      .limit(8)
      .order('rating', { ascending: false });

    if (error) throw error;
    return (data || []).map(formatProduct);
  } catch (error) {
    console.error('Error fetching top selling:', error);
    return [];
  }
}

// Fetch all products
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(formatProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}