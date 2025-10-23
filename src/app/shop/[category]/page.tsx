'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Layers } from 'lucide-react';

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
            productCount: count || 0
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center bg-white rounded-3xl p-12 shadow-gift-lg">
          <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">Category not found</p>
          <Link href="/shop" className="text-pink-600 hover:text-purple-600 font-semibold">
            Back to Shop →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white overflow-hidden">
        {category.image_url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <Link href="/shop" className="text-white/90 hover:text-white mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold">Back to Categories</span>
          </Link>
          
          <div className="flex items-center gap-6 mt-4">
            {category.image_url && (
              <div className="hidden md:block w-24 h-24 rounded-2xl overflow-hidden shadow-gift-lg border-2 border-white/30 bg-white">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-3">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Category</span>
              </div>
              <h1 className={cn([integralCF.className, "text-4xl md:text-5xl uppercase"])}>
                {category.name}
              </h1>
              {category.description && (
                <p className="text-white/90 mt-2 max-w-2xl">{category.description}</p>
              )}
              <p className="text-white/80 mt-2 font-semibold">
                {subcategories.length} {subcategories.length === 1 ? 'subcategory' : 'subcategories'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {subcategories.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/shop/${categorySlug}/${subcategory.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-gift-lg transition-all duration-300 border-2 border-pink-100 hover:border-purple-300"
                >
                  {/* Subcategory Image */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                    {subcategory.image_url ? (
                      <Image
                        src={subcategory.image_url}
                        alt={subcategory.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2 opacity-30">🏷️</div>
                          <p className="text-sm text-gray-400 font-medium px-4">
                            {subcategory.name}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {subcategory.productCount !== undefined && subcategory.productCount > 0 && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded-full shadow-md">
                        <p className="text-xs font-bold">
                          {subcategory.productCount}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Subcategory Info */}
                  <div className="p-4 text-center bg-gradient-to-b from-white to-pink-50/30">
                    <h3 className="text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all line-clamp-1">
                      {subcategory.name}
                    </h3>
                    {subcategory.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {subcategory.description}
                      </p>
                    )}
                    <p className="text-xs md:text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {subcategory.productCount} {subcategory.productCount === 1 ? 'Product' : 'Products'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">No subcategories available</p>
            <p className="text-gray-600 mb-6">This category doesn't have any subcategories yet</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-gift-lg transition-all font-bold"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}