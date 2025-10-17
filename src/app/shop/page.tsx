// app/shop/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product.types';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, sortBy, products]);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts: Product[] = (data || []).map(item => ({
        id: item.id,
        title: item.title || '',
        srcUrl: item.src_url || '/images/book1.webp',
        gallery: item.gallery || [item.src_url || '/images/book1.webp'],
        price: item.price || 0,
        discount: {
          amount: item.discount_amount || 0,
          percentage: item.discount_percentage || 0
        },
        rating: item.rating || 0,
        author: item.author,
        category: item.category,
        stock: item.stock
      }));

      setProducts(formattedProducts);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data?.map(p => p.category).filter(Boolean)));
      setCategories(uniqueCategories);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterAndSortProducts() {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => {
          const priceA = a.discount.percentage > 0 
            ? a.price - (a.price * a.discount.percentage / 100)
            : a.price;
          const priceB = b.discount.percentage > 0 
            ? b.price - (b.price * b.discount.percentage / 100)
            : b.price;
          return priceA - priceB;
        });
        break;
      case 'priceHigh':
        filtered.sort((a, b) => {
          const priceA = a.discount.percentage > 0 
            ? a.price - (a.price * a.discount.percentage / 100)
            : a.price;
          const priceB = b.discount.percentage > 0 
            ? b.price - (b.price * b.discount.percentage / 100)
            : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Already sorted by newest from database
        break;
    }

    setFilteredProducts(filtered);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase"])}>
            Shop All Books
          </h1>
          <p className="text-gray-400 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={cn([
                  "px-4 py-2 rounded-full transition-all",
                  selectedCategory === 'All' 
                    ? "bg-black text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                ])}
              >
                All ({products.length})
              </button>
              {categories.map(category => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn([
                      "px-4 py-2 rounded-full transition-all",
                      selectedCategory === category 
                        ? "bg-black text-white" 
                        : "bg-gray-100 hover:bg-gray-200"
                    ])}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard data={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">
              No products found in "{selectedCategory}" category
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-blue-600 hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}