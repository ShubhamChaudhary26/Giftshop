'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Package, ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  productCount?: number;
}

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (catError) throw catError;

      const categoriesWithCount = await Promise.all(
        (categoriesData || []).map(async (cat) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);

          return {
            ...cat,
            productCount: count || 0
          };
        })
      );

      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-4">
            <Package className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">All Categories</span>
          </div>
          <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase mb-2"])}>
            Shop by Category
          </h1>
          <p className="text-white/90 mt-2">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categories.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full" // ✅ Full height for motion wrapper
              >
                <Link 
                  href={`/shop/${category.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-gift-lg transition-all duration-300 border-2 border-pink-100 hover:border-purple-300"
                >
                  {/* Category Image */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex-shrink-0">
                    {category.image_url ? (
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl mb-4 opacity-20">🎁</div>
                          <p className="text-xl font-bold text-gray-400">{category.name}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <p className="font-semibold text-lg">Explore</p>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {category.productCount !== undefined && category.productCount > 0 && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg">
                        <p className="text-xs font-bold">
                          {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Category Details */}
                  <div className="flex flex-col flex-1 p-6 text-center bg-gradient-to-b from-white to-pink-50/30">
                    {/* Top Content (Title & Desc) */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 h-7 overflow-hidden bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all line-clamp-1">
                        {category.name}
                      </h3>
                      
                      {/* Fixed height description container */}
                      <div className="h-10 mb-3">
                        {category.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Content (Product Count) */}
                    <div className="pt-3 border-t-2 border-pink-100">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>{category.productCount} Products Available</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">No categories available yet</p>
            <p className="text-gray-600">Check back soon for new products!</p>
          </div>
        )}
      </div>
    </div>
  );
}