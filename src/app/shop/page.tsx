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
        src_url: item.src_url || '/images/book1.webp',      // ✅ Add this
        srcUrl: item.src_url || '/images/book1.webp',
        gallery: item.gallery || [item.src_url || '/images/book1.webp'],
        price: item.price || 0,
        discount: {
          amount: item.discount_amount || 0,
          percentage: item.discount_percentage || 0
        },
        discount_amount: item.discount_amount || 0,          // ✅ Add database columns
        discount_percentage: item.discount_percentage || 0,  // ✅ Add database columns
        rating: item.rating || 0,
        author: item.author,
        category: item.category,
        stock: item.stock,
        is_new_arrival: item.is_new_arrival,
        is_featured: item.is_featured,
        is_top_selling: item.is_top_selling,
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

  // ✅ Helper function for safe price calculation
  const getDiscountedPrice = (product: Product): number => {
    const price = product.price || 0;
    const discountPercent = product.discount?.percentage || 0;
    
    if (discountPercent > 0) {
      return price - (price * discountPercent / 100);
    }
    return price;
  };

  function filterAndSortProducts() {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // ✅ FIXED: Sort products with safe discount handling
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
        break;

      case 'priceHigh':
        filtered.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
        break;

      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase"])}>
            Shop All Candles
          </h1>
          <p className="text-gray-400 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="sticky top-0 bg-white border-b z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedCategory('All')}
                className={cn([
                  "px-4 py-2 rounded-full transition-all whitespace-nowrap",
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
                      "px-4 py-2 rounded-full transition-all whitespace-nowrap",
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
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black min-w-[200px]"
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProductCard data={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-xl mb-4">
              No products found in "{selectedCategory}" category
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}