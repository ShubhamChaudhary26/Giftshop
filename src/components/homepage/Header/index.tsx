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
    <section className="relative w-full h-[450px] sm:h-[400px] md:h-[500px] lg:h-[450px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center sm:justify-start px-4 sm:px-6 md:px-16 lg:px-24">
            <motion.div
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full sm:w-auto max-w-full md:max-w-2xl lg:max-w-3xl text-center sm:text-left"
            >
              <span className="bg-gray-700 text-white px-3 py-1 sm:px-5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider">
                {slides[currentSlide].discount}
              </span>

              <h1
                className={cn([
                  integralCF.className,
                  "text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white uppercase leading-snug mt-2 sm:mt-3",
                ])}
              >
                {slides[currentSlide].title}
                <span className="block text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mt-1 sm:mt-2">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-4 justify-center sm:justify-start">
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {slides[currentSlide].buttonText}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/shop"
                  className="border-2 border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                  View All Books
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-3 text-white/80 text-xs sm:text-sm lg:text-base justify-center sm:justify-start">
                <div className="flex items-center gap-1 sm:gap-2">🚚 Free Delivery</div>
                <div className="flex items-center gap-1 sm:gap-2">✨ Original Books</div>
                <div className="flex items-center gap-1 sm:gap-2">🛡️ Secure Payment</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn([
              "transition-all duration-300",
              currentSlide === index
                ? "w-6 sm:w-10 h-2.5 bg-white rounded-full"
                : "w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/70",
            ])}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gray-500"
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
