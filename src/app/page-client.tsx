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
    user: "Priya Sharma",
    content:
      '"Amazing quality! The scent lasts for a very long time. Also perfect for religious ceremonies (pooja)."',
    rating: 5,
    date: "December 15, 2024",
  },
  {
    id: 2,
    user: "Rahul Verma",
    content:
      '"Incredible collection! The lavender candle created a wonderful atmosphere in my home. Worth the money!"',
    rating: 5,
    date: "December 14, 2024",
  },
  {
    id: 3,
    user: "Ananya Patel",
    content:
      '"These candles are just wow! I ordered them as Diwali gifts, and everyone loved them."',
    rating: 5,
    date: "December 13, 2024",
  },
  {
    id: 4,
    user: "Rohan Singh",
    content:
      '"Great quality and packaging! Just light one candle in a room and the whole house smells amazing."',
    rating: 5,
    date: "December 12, 2024",
  },
  {
    id: 5,
    user: "Sneha Desai",
    content:
      '"Best candles ever! The Rose and Jasmine fragrances are fantastic. Perfect for meditation!"',
    rating: 5,
    date: "December 11, 2024",
  },
  {
    id: 6,
    user: "Arjun Reddy",
    content:
      '"It burns for a very long time and is smoke-free. It\'s also eco-friendly. Highly recommended!"',
    rating: 5,
    date: "December 10, 2024",
  },
  {
    id: 7,
    user: "Kavya Iyer",
    content:
      '"The sandalwood candle\'s fragrance is exactly like a temple. It brings positive vibes into the home!"',
    rating: 5,
    date: "December 9, 2024",
  },
  {
    id: 8,
    user: "Vikram Malhotra",
    content:
      '"Premium quality at an affordable price. I ordered it as a birthday gift, and it was absolutely perfect!"',
    rating: 5,
    date: "December 8, 2024",
  },
  {
    id: 9,
    user: "Divya Nair",
    content:
      '"The soy wax candles are fantastic! No chemicals, just pure natural fragrance. My kids love it too!"',
    rating: 5,
    date: "December 7, 2024",
  },
  {
    id: 10,
    user: "Karan Kapoor",
    content:
      '"The delivery was fast and the packaging was very secure. The candles were not damaged at all. Great service!"',
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