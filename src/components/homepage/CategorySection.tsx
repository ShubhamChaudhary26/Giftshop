// components/homepage/CategorySection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import * as motion from "framer-motion/client";
import { ArrowRight, Package, Sparkles } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error || !data) return [];
  return data;
}

async function getCategoryProductCount(categoryId: number): Promise<number> {
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  return count || 0;
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

// Related categories suggestions
const relatedCategories = [
  { name: "Anniversary Gifts", slug: "anniversary-gifts", icon: "💝", color: "from-pink-500 to-rose-600" },
  { name: "Birthday Specials", slug: "birthday-gifts", icon: "🎂", color: "from-purple-500 to-indigo-600" },
  { name: "Couple Gifts", slug: "couple-gifts", icon: "❤️", color: "from-red-500 to-pink-600" },
  { name: "Office Essentials", slug: "office-gifts", icon: "💼", color: "from-blue-500 to-cyan-600" },
];

export default async function CategorySection() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  // Get product counts for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      productCount: await getCategoryProductCount(cat.id)
    }))
  );

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-10 bg-[#fff9fb]">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
        
            
            <h2
              className={cn([
                integralCF.className,
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 font-bold gradient-text",
              ])}
            >
              SHOP BY CATEGORY
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
              Find the perfect personalized gift for every occasion
            </p>
          </motion.div>

          {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
  {categoriesWithCount.map((category, index) => {
    const gradient = gradients[index % gradients.length];

    return (
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="h-full"
      >
        <Link
          href={`/shop/${category.slug}`}
          className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg duration-500 hover:-translate-y-2"
        >
          {/* Category Image */}
          <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex-shrink-0">
            {category.image_url ? (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-2 filter grayscale transition-all duration-300">
                    🎁
                  </div>
                </div>
              </div>
            )}

            {/* Gradient overlay without hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500 ${gradient || ''}`}
            />

            {/* Center arrow overlay without hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Category Info */}
          <div className="flex flex-col justify-between p-4 sm:p-5 lg:p-6 flex-1 min-h-[140px] sm:min-h-[160px] bg-gradient-to-b from-white to-pink-50/30">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-gray-900 transition-all duration-300 line-clamp-1">
                {category.name}
              </h3>

              <div className="h-10 sm:h-11 mb-3">
                {category.description ? (
                  <p className="text-xs sm:text-sm font-bold text-gray-800 transition-all line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 italic line-clamp-2 leading-relaxed">
                    Explore our collection
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-pink-100">
              <span className="text-xs sm:text-sm font-bold bg-rose-500 bg-clip-text text-transparent">
                {category.productCount} {category.productCount === 1 ? 'Item' : 'Items'}
              </span>
              <ArrowRight className="w-4 h-4 text-rose-500 transition-all duration-300" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  })}
</div>


          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10 sm:mt-14"
          >
            <Link
              href="/shop"
             className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 border-2 border-rose-300  rounded-full hover:text-white hover:bg-rose-500  transition-all duration-300 font-bold text-sm sm:text-base shadow-lg "
            >
              View All Categories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
}