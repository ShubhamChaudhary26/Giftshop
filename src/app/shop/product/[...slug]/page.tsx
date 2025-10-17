// app/shop/product/[...slug]/page.tsx
'use client'
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { fetchProductById, fetchProductsByCategory } from "@/lib/supabase-products";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";

export default function ProductPage() {
  const params = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productId = Number(params.slug[0]);
        
        if (isNaN(productId)) {
          setLoading(false);
          return;
        }

        // Fetch product
        const product = await fetchProductById(productId);
        
        if (!product) {
          setLoading(false);
          return;
        }

        setProductData(product);

        // Fetch related products
        if (product.category) {
          const related = await fetchProductsByCategory(product.category);
          setRelatedProducts(
            related.filter(p => p.id !== product.id).slice(0, 4)
          );
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading product...</div>
      </div>
    );
  }

  if (!productData) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData.title} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      {relatedProducts.length > 0 && (
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec 
            title="You might also like" 
            data={relatedProducts} 
          />
        </div>
      )}
    </main>
  );
}