'use client'
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/common/ProductCard";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { Home, ChevronRight, Package, ArrowLeft, ShoppingBag, ArrowRight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from '@/styles/fonts';
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

export default function ProductPage() {
  const params = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  async function loadProduct() {
    try {
      const productId = Number(params.id);
      if (isNaN(productId)) { 
        setLoading(false); 
        return; 
      }

      const { data: productRaw, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
        
      if (productError || !productRaw) { 
        console.error('Product not found:', productError); 
        setLoading(false); 
        return; 
      }

      const product: Product = {
        id: productRaw.id,
        title: productRaw.title || '',
        description: productRaw.description || '',
        author: productRaw.author || '',
        src_url: productRaw.src_url,
        srcUrl: productRaw.src_url,
        gallery: productRaw.gallery || [productRaw.src_url],
        price: productRaw.price || 0,
        discount: { 
          amount: productRaw.discount_amount || 0, 
          percentage: productRaw.discount_percentage || 0 
        },
        discount_amount: productRaw.discount_amount || 0,
        discount_percentage: productRaw.discount_percentage || 0,
        rating: productRaw.rating || 0,
        category_id: productRaw.category_id,
        subcategory_id: productRaw.subcategory_id,
        stock: productRaw.stock || 0,
        is_new_arrival: productRaw.is_new_arrival,
        is_featured: productRaw.is_featured,
        is_top_selling: productRaw.is_top_selling,
      };
      setProductData(product);

      // Load category
      if (product.category_id) {
        const { data: catData } = await supabase
          .from('categories')
          .select('*')
          .eq('id', product.category_id)
          .single();
        if (catData) setCategory(catData);
      }
      
      // Load subcategory
      if (product.subcategory_id) {
        const { data: subData } = await supabase
          .from('subcategories')
          .select('*')
          .eq('id', product.subcategory_id)
          .single();
        if (subData) setSubcategory(subData);
      }

      // Load related products
      if (product.subcategory_id) {
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('subcategory_id', product.subcategory_id)
          .neq('id', product.id)
          .limit(5);
          
        if (relatedData && relatedData.length > 0) {
          const formattedRelated: Product[] = relatedData.map(item => ({
            id: item.id,
            title: item.title || '',
            src_url: item.src_url,
            srcUrl: item.src_url,
            gallery: item.gallery || [item.src_url],
            price: item.price || 0,
            discount: { 
              amount: item.discount_amount || 0, 
              percentage: item.discount_percentage || 0 
            },
            discount_amount: item.discount_amount || 0,
            discount_percentage: item.discount_percentage || 0,
            rating: item.rating || 0,
            author: item.author,
            category_id: item.category_id,
            subcategory_id: item.subcategory_id,
            stock: item.stock,
            is_new_arrival: item.is_new_arrival,
            is_featured: item.is_featured,
            is_top_selling: item.is_top_selling,
            description: item.description,
          }));
          setRelatedProducts(formattedRelated);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center bg-white rounded-3xl p-12 shadow-lg">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-2xl font-bold bg-rose-500 bg-clip-text text-transparent mb-4">
            Product not found
          </p>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-lg transition-all font-bold"
            >
              Browse Shop
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-3 border-2 border-rose-500 text-rose-600 rounded-full hover:bg-rose-500 hover:text-white hover:border-transparent transition-all font-bold"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9fb]">
      {/* Header Section - Same style as other pages */}
      

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        {/* Product Header with Gallery */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header data={productData} />
        </motion.section>

        {/* Product Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs product={productData} />
        </motion.section>
      </div>

      {/* Related Products */}
   {relatedProducts.length > 0 && (
  <div className="bg-white/80 backdrop-blur-sm border-t-2 border-pink-100 py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-3 sm:px-4">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className={cn([integralCF.className, "text-xl sm:text-2xl text-rose-500 md:text-3xl uppercase"])}>
          You might also like
        </h2>
        {subcategory && category && (
          <Link
            href={`/shop/${category.slug}/${subcategory.slug}`}
            className="hidden sm:inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm font-semibold"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="sm:hidden -mx-3 px-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 scroll-smooth" aria-label="Related products">
          {relatedProducts.map((product) => (
            <div key={product.id} className="min-w-[85%] snap-start">
              <ProductCard data={product} className="w-full max-w-none" />
            </div>
          ))}
        </div>

        {subcategory && category && (
          <div className="mt-4 text-right">
            <Link
              href={`/shop/${category.slug}/${subcategory.slug}`}
              className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm font-semibold"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Tablet/Desktop: grid */}
      <motion.div
        className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {relatedProducts.map((product, index) => (
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
    </div>
  </div>
)}

      {/* Quick Actions */}
      <div className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {category && (
              <Link
                href={`/shop/${category.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-pink-200 text-pink-600 rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all text-sm font-semibold shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>More from {category.name}</span>
              </Link>
            )}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-purple-200 text-purple-600 rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all text-sm font-semibold shadow-md"
            >
              <Package className="w-4 h-4" />
              <span>Browse All Products</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}