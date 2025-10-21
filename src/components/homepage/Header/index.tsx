'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://www.themaevastore.com/cdn/shop/files/Floating_candles.jpg?v=1756912952",
      title: "Discover Your",
      highlight: "Perfect Candle",
      subtitle: "5,000+ Premium Scented Candles at Unbeatable Prices",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      discount: "UPTO 70% OFF",
    },
    {
      id: 2,
      image: "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
      title: "New Arrivals",
      highlight: "This Week",
      subtitle: "Be the First to Explore Latest Handcrafted Candles",
      buttonText: "Explore New",
      buttonLink: "/new-arrivals",
      discount: "FREE DELIVERY",
    },
    {
      id: 3,
      image: "https://www.satyamkraft.in/cdn/shop/files/s3333_700x700.jpg?v=1747470913",
      title: "Bestselling",
      highlight: "Collections",
      subtitle: "Handpicked Aromatic Candles Loved by Customers",
      buttonText: "View Bestsellers",
      buttonLink: "/bestsellers",
      discount: "BUY 2 GET 1 FREE",
    },
    {
      id: 4,
      image: "https://m.media-amazon.com/images/I/71IVkobrqyL._UF1000,1000_QL80_.jpg",
      title: "Gift Sets for",
      highlight: "Aromatherapy",
      subtitle: "Complete Your Home with Premium Scented Candles",
      buttonText: "Browse Collection",
      buttonLink: "/gift-sets",
      discount: "SPECIAL GIFT PACKS",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative w-full h-[460px] sm:h-[550px] md:h-[600px] lg:h-[600px] xl:h-[650px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <motion.img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 5, ease: "linear" }}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col sm:items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
              >
                {/* Discount Badge */}
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="inline-block bg-gray-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base font-black tracking-wider shadow-2xl shadow-gray-500/50 uppercase"
                >
                  {slides[currentSlide].discount}
                </motion.span>

                {/* Titles & Subtitle */}
                <h1
                  className={cn([
                    integralCF.className,
                    "text-white uppercase leading-tight drop-shadow-2xl",
                  ])}
                >
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1 sm:mb-2">
                    {slides[currentSlide].title}
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-300 font-light">
                    {slides[currentSlide].highlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 font-medium max-w-lg lg:max-w-xl xl:max-w-2xl leading-relaxed drop-shadow-lg">
                  {slides[currentSlide].subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 pt-2 sm:pt-3 justify-center lg:justify-start w-full">
                  <Link
                    href={slides[currentSlide].buttonLink}
                    className="group relative bg-white text-black px-6 py-3 sm:px-8 md:px-10 lg:px-12 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gray-500/50 flex items-center justify-center gap-2 w-[80%] sm:w-auto mx-auto sm:mx-0"
                  >
                    <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                    <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </Link>

                  <Link
                    href="/shop"
                    className="border-2 border-white text-white px-6 py-3 sm:px-8 md:px-10 lg:px-12 rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:shadow-2xl w-[80%] sm:w-auto mx-auto sm:mx-0 text-center"
                  >
                    View All Candles
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
