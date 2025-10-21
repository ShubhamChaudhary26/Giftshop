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
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 5, ease: "linear" }}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
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

              {/* Main Title */}
              <h1 className={cn([integralCF.className, "text-white uppercase leading-tight drop-shadow-2xl"])}>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-1 sm:mb-2">
                  {slides[currentSlide].title}
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-300 font-light">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/95 font-medium max-w-lg mx-auto leading-relaxed drop-shadow-lg">
                {slides[currentSlide].subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 pt-2 sm:pt-3 justify-center">
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="group relative bg-white text-black px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gray-500/50 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <Link
                  href="/shop"
                  className="border-2 border-white text-white px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 text-center shadow-xl hover:shadow-2xl backdrop-blur-sm"
                >
                  View All Candles
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn([
              "transition-all duration-500 rounded-full",
              currentSlide === index
                ? "w-8 sm:w-10 md:w-12 lg:w-14 h-1.5 sm:h-2 bg-white shadow-lg shadow-white/50"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70 hover:scale-125",
            ])}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
