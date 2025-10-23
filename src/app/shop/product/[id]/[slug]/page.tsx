'use client'
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts"; // ✅ Import useMediaQuery

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
  
  const isMobile = useMediaQuery("(max-width: 639px)"); // ✅ Check for mobile screen

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  async function loadProduct() {
    try {
      const productId = Number(params.id);
      if (isNaN(productId)) { setLoading(false); return; }

      const { data: productRaw, error: productError } = await supabase
        .from('products').select('*').eq('id', productId).single();
      if (productError || !productRaw) { console.error('Product not found:', productError); setLoading(false); return; }

      const product: Product = {
        id: productRaw.id,
        title: productRaw.title || '',
        description: productRaw.description || '',
        author: productRaw.author || '',
        src_url: productRaw.src_url,
        srcUrl: productRaw.src_url,
        gallery: productRaw.gallery || [productRaw.src_url],
        price: productRaw.price || 0,
        discount: { amount: productRaw.discount_amount || 0, percentage: productRaw.discount_percentage || 0 },
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

      if (product.category_id) {
        const { data: catData } = await supabase.from('categories').select('*').eq('id', product.category_id).single();
        if (catData) setCategory(catData);
      }
      if (product.subcategory_id) {
        const { data: subData } = await supabase.from('subcategories').select('*').eq('id', product.subcategory_id).single();
        if (subData) setSubcategory(subData);
      }
      if (product.subcategory_id) {
        const { data: relatedData } = await supabase.from('products').select('*').eq('subcategory_id', product.subcategory_id).neq('id', product.id).limit(4);
        if (relatedData && relatedData.length > 0) {
          const formattedRelated: Product[] = relatedData.map(item => ({
            id: item.id, title: item.title || '', src_url: item.src_url, srcUrl: item.src_url, gallery: item.gallery || [item.src_url],
            price: item.price || 0, discount: { amount: item.discount_amount || 0, percentage: item.discount_percentage || 0 },
            discount_amount: item.discount_amount || 0, discount_percentage: item.discount_percentage || 0, rating: item.rating || 0,
            author: item.author, category_id: item.category_id, subcategory_id: item.subcategory_id, stock: item.stock,
            is_new_arrival: item.is_new_arrival, is_featured: item.is_featured, is_top_selling: item.is_top_selling,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold font-bold bg-rose-500 bg-clip-text text-transparent">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    notFound();
  }

  return (
    <main className="bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-blue-50/30 min-h-screen">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-5 sm:mb-6" />
        
        {/* ✅ Responsive Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-6 flex-wrap bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-md w-full sm:w-fit border border-pink-100">
          {isMobile ? (
            <>
              <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-1 font-medium">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 text-pink-300" />
              <span className="text-gray-400 font-bold">...</span>
              <ChevronRight className="w-4 h-4 text-pink-300" />
              <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent truncate max-w-[200px]">
                {productData.title}
              </span>
            </>
          ) : (
            <>
              <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-1 font-medium">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-pink-300" />
              <Link href="/shop" className="text-gray-600 hover:text-pink-600 transition-colors font-medium">
                Shop
              </Link>
              {category && (
                <>
                  <ChevronRight className="w-4 h-4 text-pink-300" />
                  <Link href={`/shop/${category.slug}`} className="text-gray-600 hover:text-pink-600 transition-colors font-medium">
                    {category.name}
                  </Link>
                </>
              )}
              {subcategory && (
                <>
                  <ChevronRight className="w-4 h-4 text-pink-300" />
                  <Link href={`/shop/${category?.slug}/${subcategory.slug}`} className="text-gray-600 hover:text-pink-600 transition-colors font-medium">
                    {subcategory.name}
                  </Link>
                </>
              )}
              <ChevronRight className="w-4 h-4 text-pink-300" />
              <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-[200px]">
                {productData.title}
              </span>
            </>
          )}
        </nav>

        {/* Product Details */}
        <section className="mb-11">
          <Header data={productData} />
        </section>

        {/* Product Tabs */}
        <Tabs product={productData} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-[50px] sm:mb-20 mt-12">
          <ProductListSec 
            title="🎁 You might also like" 
            data={relatedProducts} 
          />
        </div>
      )}
    </main>
  );
}