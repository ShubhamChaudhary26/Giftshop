'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&h=600&fit=crop",
      title: "Discover Your Next",
      highlight: "Favorite Book",
      subtitle: "50,000+ Books Available at Unbeatable Prices",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      discount: "UPTO 70% OFF",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=600&fit=crop",
      title: "New Arrivals",
      highlight: "This Week",
      subtitle: "Be the First to Read the Latest Bestsellers",
      buttonText: "Explore New Books",
      buttonLink: "/new-arrivals",
      discount: "FREE DELIVERY",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1920&h=600&fit=crop",
      title: "Bestselling",
      highlight: "Collections",
      subtitle: "Handpicked Books Loved by Millions of Readers",
      buttonText: "View Bestsellers",
      buttonLink: "/bestsellers",
      discount: "BUY 2 GET 1 FREE",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1920&h=600&fit=crop",
      title: "Academic and Study",
      highlight: "Materials",
      subtitle: "Complete Your Education Journey with Expert Books",
      buttonText: "Browse Academic",
      buttonLink: "/academic",
      discount: "STUDENT DISCOUNT",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[600px] overflow-hidden bg-black">
      {/* Carousel Container */}
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
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl space-y-4"
            >
              {/* Discount Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="inline-block"
              >
                <span className="bg-gray-700 text-white px-5 py-1.5 rounded-full text-sm font-bold tracking-wider">
                  {slides[currentSlide].discount}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={cn([
                  integralCF.className,
                  "text-3xl md:text-4xl lg:text-5xl text-white uppercase leading-tight"
                ])}
              >
                {slides[currentSlide].title}
                <span className="block text-gray-300">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-base md:text-lg text-white/90 leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="group bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <span>{slides[currentSlide].buttonText}</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
                <Link
                  href="/shop"
                  className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300"
                >
                  View All Books
                </Link>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚚</span>
                  <span className="text-white/80 text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <span className="text-white/80 text-sm">Original Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <span className="text-white/80 text-sm">Secure Payment</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-700/50 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-700/50 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn([
              "transition-all duration-300",
              currentSlide === index
                ? "w-10 h-2.5 bg-white rounded-full"
                : "w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/70"
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