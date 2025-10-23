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
      {/* Header Section (matches ShopPage style) */}
      <div className="text-rose-500 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2  bg-white/30 backdrop-blur-sm border border-rose-500/30 text-rose-500 px-4 py-2 rounded-full mb-4 hover:bg-white/40 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Back</span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-rose-500/30 text-rose-500 px-4 py-2 rounded-full mb-4">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Category</span>
          </div>

          <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase mb-2"])}>
            {category.name}
          </h1>
          {category.description && (
            <p className="text-rose-500/90 max-w-2xl mt-1">{category.description}</p>
          )}
          <p className="text-rose-500/90 mt-2 font-semibold">
            {subcategories.length}{' '}
            {subcategories.length === 1 ? 'subcategory' : 'subcategories'} available
          </p>
        </div>
      </div>

      {/* Subcategories Grid (same design as categories grid) */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {subcategories.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  href={`/shop/${categorySlug}/${subcategory.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border-2 border-pink-100 hover:border-rose-500"
                >
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex-shrink-0">
                    {subcategory.image_url ? (
                      <Image
                        src={subcategory.image_url}
                        alt={subcategory.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-7xl mb-3 opacity-20">🏷️</div>
                          <p className="text-lg font-bold text-gray-400">{subcategory.name}</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <p className="font-semibold text-lg">Explore</p>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {subcategory.productCount !== undefined && subcategory.productCount > 0 && (
                      <div className="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 rounded-full shadow-lg">
                        <p className="text-xs font-bold">
                          {subcategory.productCount}{' '}
                          {subcategory.productCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-6 text-center bg-gradient-to-b from-white to-pink-50/30">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 h-7 overflow-hidden text-gray-900 line-clamp-1">
                        {subcategory.name}
                      </h3>
                      <div className="h-10 mb-3">
                        {subcategory.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-pink-100">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold bg-rose-500 bg-clip-text text-transparent">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>
                          {subcategory.productCount} Products Available
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-2xl font-bold bg-rose-500 bg-clip-text text-transparent mb-4">
              No subcategories available
            </p>
            <p className="text-gray-600">This category doesn’t have any subcategories yet.</p>
            <Link
              href="/shop"
              className="mt-6 inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-lg transition-all font-bold"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
