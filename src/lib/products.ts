// lib/products.ts
import { supabase } from './supabase';

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

export async function getNewArrivals() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new_arrival', true)
    .limit(4);

  if (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }

  return data;
}

export async function getTopSelling() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_top_selling', true)
    .limit(4);

  if (error) {
    console.error('Error fetching top selling:', error);
    return [];
  }

  return data;
}