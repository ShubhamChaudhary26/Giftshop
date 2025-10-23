'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Coffee, 
  Frame, 
  Key, 
  Package, 
  Heart, 
  Cake, 
  Users,
  Sparkles,
  Award,
  Star,
  TrendingUp
} from 'lucide-react';

const giftBrandsData = [
  { id: "personalized-gifts", name: "Custom Gifts", icon: Gift },
  { id: "photo-mugs", name: "Photo Mugs", icon: Coffee },
  { id: "picture-frames", name: "Picture Frames", icon: Frame },
  { id: "keyrings", name: "Keyrings", icon: Key },
  { id: "gift-sets", name: "Gift Sets", icon: Package },
  { id: "anniversary", name: "Anniversary Gifts", icon: Heart },
  { id: "birthday", name: "Birthday Specials", icon: Cake },
  { id: "couple-gifts", name: "Couple Gifts", icon: Users },
  { id: "premium", name: "Premium Collection", icon: Award },
  { id: "trending", name: "Trending Now", icon: TrendingUp },
  { id: "bestseller", name: "Best Sellers", icon: Star },
  { id: "new", name: "New Arrivals", icon: Sparkles },
];

const Brands = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      <div className="max-w-frame mx-auto px-4 xl:px-0 mb-8">
        <h2 className="text-center text-sm sm:text-base font-bold text-gray-500 uppercase tracking-wider">
          Browse Our Popular Collections
        </h2>
      </div>

      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll-brands">
          {[...giftBrandsData, ...giftBrandsData, ...giftBrandsData].map((brand, index) => {
            const IconComponent = brand.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex-shrink-0 mx-2 sm:mx-3"
              >
                <div className="group bg-white border-2 border-gray-200 hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 rounded-2xl px-5 sm:px-7 py-3 sm:py-4 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 group-hover:from-pink-200 group-hover:to-purple-200 transition-all duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-pink-600 whitespace-nowrap transition-colors">
                      {brand.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-brands {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll-brands {
          animation: scroll-brands 40s linear infinite;
        }
        .animate-scroll-brands:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Brands;