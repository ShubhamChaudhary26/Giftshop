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
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&h=600&fit=crop",
      title: "Discover Next",
      highlight: "Favorite Book",
      subtitle: "50,000+ IT & AI Books Available at Unbeatable Prices",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      discount: "UPTO 70% OFF",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=600&fit=crop",
      title: "New Arrivals",
      highlight: "This Week",
      subtitle: "Be the First to Explore Latest AI & Tech Books",
      buttonText: "Explore New Books",
      buttonLink: "/new-arrivals",
      discount: "FREE DELIVERY",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1920&h=600&fit=crop",
      title: "Bestselling",
      highlight: "Collections",
      subtitle: "Handpicked IT & AI Books Loved by Readers",
      buttonText: "View Bestsellers",
      buttonLink: "/bestsellers",
      discount: "BUY 2 GET 1 FREE",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1920&h=600&fit=crop",
      title: "Academic Study",
      highlight: "Materials",
      subtitle: "Complete Your AI & IT Learning Journey",
      buttonText: "Browse Academic",
      buttonLink: "/academic",
      discount: "STUDENT DISCOUNT",
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
    <section className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[615px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
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
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
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

                {/* Main Title */}
                <h1
                  className={cn([
                    integralCF.className,
                    "text-white uppercase leading-tight drop-shadow-2xl",
                  ])}
                >
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-1 sm:mb-2">
                    {slides[currentSlide].title}
                  </span>
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-300 font-light">
                    {slides[currentSlide].highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/95 font-medium max-w-lg lg:max-w-xl xl:max-w-2xl leading-relaxed drop-shadow-lg">
                  {slides[currentSlide].subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 pt-2 sm:pt-3">
                  <Link
                    href={slides[currentSlide].buttonLink}
                    className="group relative bg-white text-black px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold  hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gray-500/50 flex items-center justify-center gap-2 overflow-hidden"
                  >
                    <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                    <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <Link
                    href="/shop"
                    className="border-2 border-white text-white px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 text-center shadow-xl hover:shadow-2xl backdrop-blur-sm"
                  >
                    View All Books
                  </Link>
                </div>

                {/* Features */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-6 pt-1 sm:pt-2"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                    <span className="text-sm sm:text-base md:text-lg">🚚</span>
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                    <span className="text-sm sm:text-base md:text-lg">✨</span>
                    <span>Original Books</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                    <span className="text-sm sm:text-base md:text-lg">🛡️</span>
                    <span>Secure Payment</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Desktop Only) */}
      <div className="hidden lg:block">
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-xl z-10"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-xl z-10"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

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

      {/* Animated Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gray-600 via-gray-800 to-gray-200 shadow-lg shadow-orange-500/50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
          }}
          key={currentSlide}
        />
      </div>
    </section>
  );
};

export default HeroSection;