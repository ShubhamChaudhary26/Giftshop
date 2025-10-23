'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { ArrowRight, Sparkles, Star, Users, Shield } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&q=90",
    mobileImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
    title: "Made for You",
    subtitle: "Gifts That Tell Your Story",
    description: "Custom mugs, frames & keyrings made with love",
    cta: "Shop Now",
    ctaLink: "/shop",
    tag: "Up to 50% Off",
    badge: "Trending",
  },
  {
    id: 4,
   image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&q=90",
    mobileImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    title: "Photo Frames",
    subtitle: "Gifts That Tell Your Story",
    description: "Custom mugs, frames & keyrings made with love",
    cta: "Shop Frames",
    ctaLink: "/frames",
    tag: "20% Off",
    badge: "Bestseller",
  },
  {
  id: 5,
  image: "https://images.unsplash.com/photo-151s7685352821-92cf88aee5a5?auto=format&fit=crop&w=1920&q=90",
  mobileImage: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=80",
  title: "Custom Mugs",
  subtitle: "Gifts That Tell Your Story",
  description: "Custom mugs, frames & keyrings made with love",
  cta: "Create Your Mug",
  ctaLink: "/mugs",
  tag: "Buy 1 Get 1",
  badge: "Hot Deal",
},


];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[500px] xs:h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[650px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {/* Desktop Image */}
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="hidden sm:block w-full h-full object-cover"
            />
            {/* Mobile Image */}
            <img
              src={slides[currentSlide].mobileImage}
              alt={slides[currentSlide].title}
              className="block sm:hidden w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 sm:via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
              <div className="max-w-full sm:max-w-xl lg:max-w-2xl">
                {/* Badge & Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                >
                  <span className="inline-flex items-center gap-1.5 bg-rose-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] xs:text-xs font-bold uppercase tracking-wide shadow-lg">
                    <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    {slides[currentSlide].badge}
                  </span>
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] xs:text-xs font-bold uppercase">
                    {slides[currentSlide].tag}
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={cn([
                    integralCF.className,
                    "text-rose-500 mb-3 sm:mb-4 leading-[1.1]"
                  ])}
                >
                  {/* Title - First Line */}
                  <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-rose-300 lg:text-6xl xl:text-7xl">
                    {slides[currentSlide].title}
                  </span>
                  {/* Subtitle - Second Line with Gradient */}
                  <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl mt-1 sm:mt-2 bg-clip-text  text-gray-200">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-200 text-sm xs:text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                  <Link
                    href={slides[currentSlide].ctaLink}
                    className="group relative inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 xs:px-7 xs:py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-bold text-sm xs:text-base sm:text-lg overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10">{slides[currentSlide].cta}</span>
                    <ArrowRight className="relative z-10 w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center px-6 py-3 xs:px-7 xs:py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-bold text-sm xs:text-base sm:text-lg border-2 border-rose-300 text-white hover:bg-rose-300 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
                  >
                    View All
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-3 xs:gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs xs:text-sm font-semibold">4.9/5</span>
                  </div>
                  <div className="hidden xs:block h-3 sm:h-4 w-px bg-white/30" />
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <Users className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs xs:text-sm font-semibold">50k+ Customers</span>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-white/30" />
                  <div className="hidden sm:flex items-center gap-2 text-white">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-semibold">100% Secure</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 xs:bottom-12 sm:bottom-12 left-20 xs:left-5 sm:left-8 lg:left-12 xl:left-[100vh] z-20 flex gap-1.5 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn([
              "h-1 sm:h-1.5 rounded-full transition-all duration-300",
              currentSlide === index 
                ? "w-8 sm:w-12 bg-white" 
                : "w-6 sm:w-8 bg-white/40 hover:bg-white/60"
            ])}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (Desktop Only) */}
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="hidden  lg:flex absolute left-4 xl:left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 xl:w-12 xl:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 xl:w-6 xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="hidden lg:flex absolute right-4 xl:right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 xl:w-12 xl:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 xl:w-6 xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Quick Stats Bar (Desktop Only - XL screens) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="hidden xl:flex absolute bottom-12 right-16 z-20 gap-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3.5"
      >
        <div className="text-center">
          <div className="text-xl font-bold text-white">50k+</div>
          <div className="text-[10px] text-gray-300 uppercase tracking-wide">Customers</div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-white">100k+</div>
          <div className="text-[10px] text-gray-300 uppercase tracking-wide">Delivered</div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-white">24/7</div>
          <div className="text-[10px] text-gray-300 uppercase tracking-wide">Support</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;