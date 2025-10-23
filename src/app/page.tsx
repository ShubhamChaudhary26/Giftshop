// app/page.tsx
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { supabase } from "@/lib/supabase";
import GiftBoxBuilder from "@/components/ScentIntensitySelector/ScentIntensitySelector";
import CategorySection from "@/components/homepage/CategorySection";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export const dynamic = "force-dynamic";

// Fetch new arrivals (Gift Products)
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
    src_url: item.src_url || "/images/placeholder.png",
    srcUrl: item.src_url || "/images/placeholder.png",
    gallery: item.gallery || [item.src_url],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0,
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
  }));
}

// Fetch top selling gifts
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
    src_url: item.src_url || "/images/placeholder.png",
    srcUrl: item.src_url || "/images/placeholder.png",
    gallery: item.gallery || [item.src_url],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0,
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
  }));
}

export default async function Home() {
  const [newArrivals, topSelling] = await Promise.all([
    getNewArrivals(),
    getTopSelling(),
  ]);

  const validNewArrivals = newArrivals.filter(
    (product) => product && product.id
  );
  const validTopSelling = topSelling.filter((product) => product && product.id);

  return (
    <>
      <Header />

      <Brands />

      <main className="relative overflow-hidden">
        <CategorySection />

        <section className="">
          <GiftBoxBuilder />
        </section>

        {/* 🆕 New Arrivals */}
        {validNewArrivals.length > 0 && (
          <>
            <section className="">
              <ProductListSec
                title="NEW ARRIVALS"
                data={validNewArrivals}
                viewAllLink="/shop"
              />
            </section>
          </>
        )}

        {/* 🌟 Why Choose Us */}

        <WhyChooseUs />

        {/* ⭐ Customer Reviews */}

        <Reviews />
      </main>
    </>
  );
}
