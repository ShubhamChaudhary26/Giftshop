// app/page-client.tsx (Alternative with loading states)
'use client'
import { useEffect, useState } from 'react';
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { fetchNewArrivals, fetchTopSelling } from "@/lib/supabase-products";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
  </div>
);

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const [newArrivalsData, topSellingData] = await Promise.all([
          fetchNewArrivals(),
          fetchTopSelling()
        ]);
        
        setNewArrivals(newArrivalsData);
        setTopSelling(topSellingData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: `"These books on AI and Cyber Security are amazing! Easy to read and very informative."`,
    rating: 5,
    date: "December 1, 2024",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"The IT and Telecommunication books helped me a lot in my studies. Highly recommend!"`,
    rating: 5,
    date: "December 2, 2024",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"Great collection of books. The print quality and images are excellent."`,
    rating: 5,
    date: "December 3, 2024",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"I love these books! The design and content are top-notch. Perfect for learning or gifting."`,
    rating: 5,
    date: "December 4, 2024",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"Highly recommend for anyone interested in AI, Cyber Security, or IT topics."`,
    rating: 5,
    date: "December 5, 2024",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"The books are clear, well-written, and full of valuable information. Love them!"`,
    rating: 5,
    date: "December 6, 2024",
  },
];

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[55px] sm:my-[72px]">
        {/* New Arrivals Section */}
        {loading ? (
          <div className="max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">NEW ARRIVALS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <ProductSkeleton key={i} />)}
            </div>
          </div>
        ) : (
          newArrivals.length > 0 && (
            <>
              <ProductListSec
                title="NEW ARRIVALS"
                data={newArrivals}
                viewAllLink="/shop#new-arrivals"
              />
              <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
              </div>
            </>
          )
        )}

        {/* Top Selling Section */}
        {loading ? (
          <div className="max-w-[1400px] mx-auto px-4 mb-20">
            <h2 className="text-3xl font-bold mb-8">TOP SELLING</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <ProductSkeleton key={i} />)}
            </div>
          </div>
        ) : (
          topSelling.length > 0 && (
            <div className="mb-[50px] sm:mb-20">
              <ProductListSec
                title="TOP SELLING"
                data={topSelling}
                viewAllLink="/shop#top-selling"
              />
            </div>
          )
        )}

        <Reviews data={reviewsData} />
      </main>
    </>
  );
}