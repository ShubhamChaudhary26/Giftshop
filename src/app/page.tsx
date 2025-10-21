import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { supabase } from "@/lib/supabase";
import { reviewsData } from "@/lib/static-data";
import { notFound } from "next/navigation";
import TrustBadges from "@/components/TrustBadges/TrustBadges";
import GiftBoxBuilder from "@/components/ScentIntensitySelector/ScentIntensitySelector";

// Make page dynamic (no static caching)
export const dynamic = "force-dynamic";


// Fetch new arrivals
async function getNewArrivals(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new_arrival", true)
    .limit(8)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "",
    src_url: item.src_url || "/images/book1.webp", // ✅ Changed from srcUrl to src_url
    srcUrl: item.src_url || "/images/book1.webp", // Keep both for compatibility
    gallery: item.gallery || [item.src_url || "/images/book1.webp"],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0,
    },
    discount_amount: item.discount_amount || 0, // Add these too
    discount_percentage: item.discount_percentage || 0,
    rating: item.rating || 0,
    author: item.author,
    category: item.category,
    stock: item.stock,
    is_new_arrival: item.is_new_arrival,
    is_featured: item.is_featured,
    is_top_selling: item.is_top_selling,
  }));
}

// Fetch top selling
async function getTopSelling(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_top_selling", true)
    .limit(8)
    .order("rating", { ascending: false });

  if (error || !data) return [];

  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "",
    src_url: item.src_url || "/images/book1.webp", // ✅ Changed from srcUrl to src_url
    srcUrl: item.src_url || "/images/book1.webp", // Keep both for compatibility
    gallery: item.gallery || [item.src_url || "/images/book1.webp"],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0,
    },
    discount_amount: item.discount_amount || 0,
    discount_percentage: item.discount_percentage || 0,
    rating: item.rating || 0,
    author: item.author,
    category: item.category,
    stock: item.stock,
    is_new_arrival: item.is_new_arrival,
    is_featured: item.is_featured,
    is_top_selling: item.is_top_selling,
  }));
}

export default async function Home() {
  const [newArrivals, topSelling] = await Promise.all([
    getNewArrivals(),
    getTopSelling(),
  ]);

  // Filter out any null or deleted books (safety)
  const validNewArrivals = newArrivals.filter((book) => book && book.id);
  const validTopSelling = topSelling.filter((book) => book && book.id);

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[55px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={validNewArrivals}
          viewAllLink="/shop#new-arrivals"
        />

        {validNewArrivals.length > 0 && (
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
          </div>
        )}
        <TrustBadges />
        <GiftBoxBuilder />
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="TOP SELLING"
            data={validTopSelling}
            viewAllLink="/shop#top-selling"
          />
        </div>

        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
