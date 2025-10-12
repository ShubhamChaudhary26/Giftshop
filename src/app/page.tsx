import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import CandleStyles from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Lavender Scented Candle",
    srcUrl: "/images/candle1.png",
    gallery: ["/images/candle1.png", "/images/candle2.png", "/images/candle3.png"],
    price: 12,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
  {
    id: 2,
    title: "Vanilla Aroma Candle",
    srcUrl: "/images/candle4.png",
    gallery: ["/images/candle4.png", "/images/candle5.png"],
    price: 15,
    discount: { amount: 0, percentage: 20 },
    rating: 4.0,
  },
  {
    id: 3,
    title: "Decorative Rose Candle",
    srcUrl: "/images/candle6.png",
    gallery: ["/images/candle6.png", "/images/candle7.png"],
    price: 18,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
  {
    id: 4,
    title: "Luxury Soy Candle",
    srcUrl: "/images/candle8.png",
    gallery: ["/images/candle8.png", "/images/candle9.png", "/images/candle10.png"],
    price: 25,
    discount: { amount: 0, percentage: 30 },
    rating: 5.0,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Cinnamon Spice Candle",
    srcUrl: "/images/candle11.png",
    gallery: ["/images/candle11.png", "/images/candle12.png", "/images/candle13.png"],
    price: 20,
    discount: { amount: 0, percentage: 10 },
    rating: 5.0,
  },
  {
    id: 6,
    title: "Ocean Breeze Candle",
    srcUrl: "/images/candle14.png",
    gallery: ["/images/candle14.png", "/images/candle15.png"],
    price: 18,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
  {
    id: 7,
    title: "Sandalwood Candle",
    srcUrl: "/images/candle16.png",
    gallery: ["/images/candle16.png", "/images/candle17.png"],
    price: 22,
    discount: { amount: 0, percentage: 0 },
    rating: 4.0,
  },
  {
    id: 8,
    title: "Mint & Eucalyptus Candle",
    srcUrl: "/images/candle18.png",
    gallery: ["/images/candle18.png", "/images/candle19.png"],
    price: 16,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 9,
    title: "Rose Petal Candle",
    srcUrl: "/images/candle20.png",
    gallery: ["/images/candle20.png"],
    price: 19,
    discount: { amount: 0, percentage: 15 },
    rating: 4.0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: `"The scented candles from Candle.co have transformed my living room into a cozy haven. Their fragrance is subtle yet lasting, and the design is elegant.”`,
    rating: 5,
    date: "October 1, 2025",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I gifted these candles to my friends, and everyone loved them! The aroma is refreshing, and the candles burn evenly.”`,
    rating: 5,
    date: "October 2, 2025",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"The decorative candles are perfect for special occasions. They not only smell amazing but also look beautiful as centerpieces.”`,
    rating: 5,
    date: "October 3, 2025",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"I love the luxury candle set! The packaging is premium, and the scents are heavenly. Highly recommend for gifting or personal use.”`,
    rating: 5,
    date: "October 4, 2025",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"The soy candles burn clean and long. The aroma fills the room perfectly without being overpowering.”`,
    rating: 5,
    date: "October 5, 2025",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely adore these candles! They are perfect for relaxation and create a calming ambiance in my home.”`,
    rating: 5,
    date: "October 6, 2025",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="TOP SELLING"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          {/* // pata nahi rehne dena he ya naii// */}
          {/* <CandleStyles /> */}
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
