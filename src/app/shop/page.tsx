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

// Gradient colors for categories
const gradients = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-red-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-teal-500 to-cyan-500",
];

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
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9fb]">
      {/* Header */}
      <div className="text-rose-500 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-rose-500/30 text-rose-500 px-4 py-2 rounded-full mb-4">
            <Package className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">All Categories</span>
          </div>
          <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase mb-2"])}>
            Shop by Category
          </h1>
          <p className="text-rose-500/90 mt-2">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {categories.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => {
              const gradient = gradients[index % gradients.length];
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="h-full"
                >
                  <Link
                    href={`/shop/${category.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl duration-500 hover:-translate-y-2"
                  >
                    {/* Category Image - Mobile pe BADA */}
                    <div className="aspect-[5/3] sm:aspect-[4/3] relative overflow-hidden bg-white flex-shrink-0">
                      {category.image_url ? (
                        <Image
                          src={category.image_url}
                          alt={category.name}
                          fill
                          className="object-contain p-0 sm:p-3 md:p-4 group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={index < 5}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                          <div className="text-center">
                            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                              🎁
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className={cn([
                        "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-70 transition-opacity duration-500",
                        gradient
                      ])} />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full">
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Category Info - Description with responsive */}
                    <div className="flex flex-col justify-between p-3 sm:p-5 lg:p-6 flex-1 min-h-[100px] sm:min-h-[120px] bg-gradient-to-b from-white to-pink-50/30">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-900 transition-all duration-300 line-clamp-1">
                          {category.name}
                        </h3>
                        
                        {/* Description visible on all screens */}
                        <div className="h-8 sm:h-10 lg:h-11 mb-5 sm:mb-5">
                          {category.description ? (
                            <p className="text-xs sm:text-sm font-bold text-gray-700 transition-all line-clamp-2 leading-relaxed">
                              {category.description}
                            </p>
                          ) : (
                            <p className="text-xs sm:text-sm text-gray-500 italic line-clamp-2 leading-relaxed">
                              Explore our collection
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-pink-100">
                        <span className="text-xs sm:text-sm font-bold bg-rose-500 bg-clip-text text-transparent">
                          {category.productCount} {category.productCount === 1 ? 'Item' : 'Items'}
                        </span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl font-bold bg-rose-500 bg-clip-text text-transparent mb-4">No categories available yet</p>
            <p className="text-gray-600">Check back soon for new products!</p>
          </div>
        )}
      </div>
    </div>
  );
}