'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Layers, ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  productCount?: number;
}

// Gradient colors (same as ShopPage)
const gradients = [
  ""
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [categorySlug]);

  async function fetchData() {
    try {
      const { data: categoryData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

      if (catError) throw catError;
      setCategory(categoryData);

      const { data: subcategoriesData, error: subError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('is_active', true)
        .order('name');

      if (subError) throw subError;

      const subcategoriesWithCount = await Promise.all(
        (subcategoriesData || []).map(async (sub) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('subcategory_id', sub.id);

          return {
            ...sub,
            productCount: count || 0,
          };
        })
      );

      setSubcategories(subcategoriesWithCount);
    } catch (error) {
      console.error('Error:', error);
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

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center bg-white rounded-3xl p-12 shadow-lg">
          <p className="text-2xl font-bold bg-rose-500 bg-clip-text text-transparent mb-4">
            Category not found
          </p>
          <Link href="/shop" className="text-pink-600 font-semibold hover:underline">
            Back to Shop →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9fb]">
      {/* Header Section */}
      <div className="py-5 relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-500 to-rose-300 text-white">
  {/* subtle overlay blur for glow */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    {/* Back button */}
    <Link
      href="/shop"
      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-4 hover:bg-white/20 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-xs font-bold uppercase">Back</span>
    </Link>

    {/* Subcategory Tag */}
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-4">
      <Layers className="w-4 h-4" />
      <span className="text-xs font-bold uppercase">Subcategories</span>
    </div>

    {/* Heading */}
    <h1
      className={cn([
        integralCF.className,
        "text-4xl md:text-5xl uppercase mb-2 bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent",
      ])}
    >
      {category.name}
    </h1>

    {/* Optional description */}
    {category.description && (
      <p className="text-rose-50/90 max-w-2xl mt-1">{category.description}</p>
    )}

    {/* Count */}
    <p className="text-rose-50/90 mt-2">
      {subcategories.length}{" "}
      {subcategories.length === 1 ? "subcategory" : "subcategories"} available
    </p>
  </div>
</div>


{/* Subcategories Grid */}
<div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
  {subcategories.length > 0 ? (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {subcategories.map((subcategory, index) => {
        const gradient = gradients[index % gradients.length];
        
        return (
          <motion.div
            key={subcategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="h-full"
          >
            <Link
              href={`/shop/${categorySlug}/${subcategory.slug}`}
              className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl duration-500 hover:-translate-y-2"
            >
              {/* Subcategory Image */}
              <div className="aspect-square relative overflow-hidden bg-white flex-shrink-0">
                {subcategory.image_url ? (
                  <Image
                    src={subcategory.image_url}
                    alt={subcategory.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    priority={index < 5}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl lg:text-6xl filter grayscale transition-all duration-300">
                        🏷️
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Removed hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500`} />

                {/* Optional arrow overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Subcategory Info */}
              <div className="flex flex-col justify-between p-3 md:p-4 lg:p-5 flex-1 min-h-[80px] md:min-h-[100px] bg-gradient-to-b from-white to-pink-50/30">
                <div className="flex-1">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 text-gray-900 line-clamp-2">
                    {subcategory.name}
                  </h3>
                  
                  {subcategory.description && (
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2">
                      {subcategory.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-pink-100">
                  <span className="text-xs md:text-sm font-bold bg-rose-500 bg-clip-text text-transparent">
                    {subcategory.productCount} {subcategory.productCount === 1 ? 'Item' : 'Items'}
                  </span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-rose-500 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  ) : (
    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
      <div className="text-6xl mb-4">📂</div>
      <p className="text-2xl font-bold bg-rose-500 bg-clip-text text-transparent mb-4">
        No subcategories available
      </p>
      <p className="text-gray-600 mb-6">This category doesn't have any subcategories yet.</p>
      <Link
        href="/shop"
        className="mt-6 inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-lg transition-all font-bold"
      >
        Browse All Categories
      </Link>
    </div>
  )}
</div>


{/* Optional: Subcategories Stats - products wale jaisa */}
{subcategories.length > 3 && (
  <div className="bg-white/80 backdrop-blur-sm border-t-2 border-b-2 border-pink-100 py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold bg-rose-500 bg-clip-text text-transparent">{subcategories.length}</p>
          <p className="text-sm font-semibold text-gray-700 mt-1">Subcategories</p>
        </div>
        <div>
          <p className="text-3xl font-bold bg-rose-500 bg-clip-text text-transparent">
            {subcategories.reduce((sum, sub) => sum + (sub.productCount || 0), 0)}
          </p>
          <p className="text-sm font-semibold text-gray-700 mt-1">Total Products</p>
        </div>
        <div>
          <p className="text-3xl font-bold bg-rose-500 bg-clip-text text-transparent">
            {subcategories.filter((s) => (s.productCount || 0) > 0).length}
          </p>
          <p className="text-sm font-semibold text-gray-700 mt-1">Active Collections</p>
        </div>
        <div>
          <p className="text-3xl font-bold bg-rose-500 bg-clip-text text-transparent">
            {Math.max(...subcategories.map((s) => s.productCount || 0))}
          </p>
          <p className="text-sm font-semibold text-gray-700 mt-1">Largest Collection</p>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}