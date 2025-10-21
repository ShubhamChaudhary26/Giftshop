'use client'
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Services offered by candle store
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Custom Candles",
      shortDesc: "Personalized fragrances & designs for you",
      longDesc: "Create your unique signature candle with our custom service. Choose your fragrance, color, jar design, and even add personalized labels for special occasions.",
      features: [
        "Choose from 100+ fragrances",
        "Custom jar designs & colors",
        "Personalized labels & messages",
        "Minimum order: Just 1 candle"
      ],
      image: "https://images.unsplash.com/photo-1602874801006-95926fc7e8b8?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Premium Gift Sets",
      shortDesc: "Beautiful gift boxes for every occasion",
      longDesc: "Surprise your loved ones with our curated gift sets. Perfect for birthdays, anniversaries, Diwali, weddings, and corporate gifting.",
      features: [
        "Luxury packaging included",
        "Customizable gift boxes",
        "Greeting cards & messages",
        "Same-day delivery available"
      ],
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Bulk Orders",
      shortDesc: "Special discounts for weddings & events",
      longDesc: "Planning a wedding, corporate event, or party? Get wholesale pricing on bulk orders with dedicated support and custom packaging options.",
      features: [
        "Up to 50% discount",
        "Custom fragrances for events",
        "Branded packaging available",
        "Dedicated account manager"
      ],
      image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: "Candle Subscription",
      shortDesc: "Monthly curated candle boxes delivered",
      longDesc: "Never run out of your favorite candles! Subscribe to receive handpicked premium candles every month with exclusive member benefits.",
      features: [
        "New fragrances every month",
        "20% off subscription price",
        "Free shipping always",
        "Cancel anytime, no commitment"
      ],
      image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Easy Returns",
      shortDesc: "30-day hassle-free return policy",
      longDesc: "Not satisfied with your candles? No worries! We offer a 30-day return policy with free pickup service and instant refunds to your account.",
      features: [
        "30-day return window",
        "Free pickup from home",
        "Instant refund processing",
        "No questions asked policy"
      ],
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "24/7 Support",
      shortDesc: "Round-the-clock customer assistance",
      longDesc: "Our aromatherapy experts and support team are available 24/7 to help you choose the perfect fragrance, answer queries, or resolve any issues.",
      features: [
        "24/7 live chat support",
        "WhatsApp assistance",
        "Video call consultations",
        "Fragrance recommendations"
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop"
    }
  ];

  // Additional services
  const additionalServices = [
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      title: "Same Day Delivery", 
      desc: "Get your candles delivered within hours in select cities" 
    },
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ), 
      title: "Candle Refills", 
      desc: "Eco-friendly refill service for sustainable living" 
    },
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ), 
      title: "Aromatherapy Consult", 
      desc: "Free consultation with certified aromatherapy experts" 
    },
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ), 
      title: "Candle Care Guide", 
      desc: "Detailed tips to maximize burn time and fragrance" 
    },
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      title: "Corporate Gifting", 
      desc: "Branded candles for corporate events and employee gifts" 
    },
    { 
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      title: "Candle Workshops", 
      desc: "Learn to make your own candles with expert guidance" 
    },
  ];

  // How it works
  const process = [
    { step: "01", title: "Choose", desc: "Select your fragrance", icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { step: "02", title: "Order", desc: "Add to cart & checkout", icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { step: "03", title: "Track", desc: "Real-time tracking", icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { step: "04", title: "Enjoy", desc: "Light up & relax!", icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )}
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Mumbai",
      rating: 5,
      text: "The custom candle service is amazing! Created a lavender-vanilla candle for my bedroom. The fragrance lasts all day!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Rahul Verma",
      role: "Delhi",
      rating: 5,
      text: "Ordered 100 candles for my wedding. The bulk discount was great and packaging was beautiful. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Ananya Desai",
      role: "Bangalore",
      rating: 5,
      text: "Subscription box is worth every rupee! Love discovering new fragrances every month. Customer service is top-notch!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How long do your candles burn?",
      answer: "Our candles have an average burn time of 40-60 hours depending on the size. Proper care (trimming wick, avoiding drafts) can extend burn time by 20%."
    },
    {
      question: "Are your candles eco-friendly?",
      answer: "Yes! We use 100% natural soy wax, cotton wicks, and essential oils. All packaging is recyclable and we offer a candle jar refill service."
    },
    {
      question: "Do you offer custom fragrances?",
      answer: "Absolutely! Our fragrance experts can help you create custom blends. Minimum order for fully custom fragrances is 10 candles."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day hassle-free return. If you're not satisfied, we'll pick up the candle from your home and process an instant refund."
    },
    {
      question: "Do you deliver all over India?",
      answer: "Yes, we deliver pan-India! Same-day delivery available in Mumbai, Delhi, Bangalore, and Pune. Other cities receive within 2-5 business days."
    }
  ];

  // Stats
  const stats = [
    { number: "2K+", label: "Happy Customers" },
    { number: "70+", label: "Unique Fragrances" },
    { number: "28", label: "States Covered" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className={cn([
                integralCF.className,
                "text-5xl md:text-6xl lg:text-7xl mb-6 uppercase"
              ])}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our Services
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We're committed to making your candle buying experience seamless and delightful
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 md:py-22">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black uppercase mb-4"
            ])}>
              What We Offer
            </h2>
            <p className="text-gray-600 text-lg">
              Premium services designed for candle lovers
            </p>
          </motion.div>

          {/* Service Selector */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Service List */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedService(index)}
                  className={cn([
                    "p-6 rounded-2xl cursor-pointer transition-all duration-300",
                    selectedService === index 
                      ? "bg-black text-white shadow-xl" 
                      : "bg-gray-100 hover:bg-gray-200"
                  ])}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{service.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className={cn([
                        "text-sm",
                        selectedService === index ? "text-gray-300" : "text-gray-600"
                      ])}>
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service Details */}
            <motion.div
              key={selectedService}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <img 
                  src={services[selectedService].image}
                  alt={services[selectedService].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl mb-4 uppercase font-extrabold">
                {services[selectedService].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {services[selectedService].longDesc}
              </p>
              <div className="space-y-3">
                {services[selectedService].features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-green-500 text-xl">✓</span>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black uppercase mb-4"
            ])}>
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Simple steps to get your perfect candle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div 
                  className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-gray-400 text-sm mb-2">{item.step}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black uppercase mb-4"
            ])}>
              More Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="text-gray-700 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black uppercase mb-4"
            ])}>
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from real candle lovers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black uppercase mb-4"
            ])}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl"
                  >
                    ↓
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === index ? "auto" : 0,
                    opacity: activeFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className={cn([
              integralCF.className,
              "text-4xl md:text-5xl mb-6 uppercase"
            ])}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience Our Premium Services
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join 50,000+ happy customers across India
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/shop"
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
            >
              Start Shopping →
            </Link>
            <Link 
              href="/contact"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all"
            >
              Get Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;