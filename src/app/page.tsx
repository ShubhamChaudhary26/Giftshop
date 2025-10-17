// app/page.tsx
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { supabase } from "@/lib/supabase";

// Function to fetch products from Supabase
async function getNewArrivals(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new_arrival', true)
    .limit(8)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(item => ({
    id: item.id,
    title: item.title || '',
    srcUrl: item.src_url || '/images/book1.webp',
    gallery: item.gallery || [item.src_url || '/images/book1.webp'],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0
    },
    rating: item.rating || 0,
    author: item.author,
    category: item.category,
    stock: item.stock
  }));
}

async function getTopSelling(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_top_selling', true)
    .limit(8)
    .order('rating', { ascending: false });

  if (error || !data) return [];

  return data.map(item => ({
    id: item.id,
    title: item.title || '',
    srcUrl: item.src_url || '/images/book1.webp',
    gallery: item.gallery || [item.src_url || '/images/book1.webp'],
    price: item.price || 0,
    discount: {
      amount: item.discount_amount || 0,
      percentage: item.discount_percentage || 0
    },
    rating: item.rating || 0,
    author: item.author,
    category: item.category,
    stock: item.stock
  }));
}

// Reviews data (static for now, can move to Supabase later)
export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: `"These books on AI and Cyber Security are amazing! Easy to read and very informative."`,
    rating: 5,
    date: "December 15, 2024",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"The IT and Telecommunication books helped me a lot in my studies. Highly recommend!"`,
    rating: 5,
    date: "December 14, 2024",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"Great collection of books. The print quality and images are excellent."`,
    rating: 5,
    date: "December 13, 2024",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"I love these books! The design and content are top-notch. Perfect for learning or gifting."`,
    rating: 5,
    date: "December 12, 2024",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"Highly recommend for anyone interested in AI, Cyber Security, or IT topics."`,
    rating: 5,
    date: "December 11, 2024",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"The books are clear, well-written, and full of valuable information. Love them!"`,
    rating: 5,
    date: "December 10, 2024",
  },
];

// Export empty arrays for backward compatibility
export const newArrivalsData: Product[] = [];
export const topSellingData: Product[] = [];
export const relatedProductData: Product[] = [];

export default async function Home() {
  // Fetch data from Supabase
  const [newArrivals, topSelling] = await Promise.all([
    getNewArrivals(),
    getTopSelling()
  ]);

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[55px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivals}
          viewAllLink="/shop#new-arrivals"
        />
        
        {newArrivals.length > 0 && (
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
          </div>
        )}
        
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="TOP SELLING"
            data={topSelling}
            viewAllLink="/shop#top-selling"
          />
        </div>
        
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}