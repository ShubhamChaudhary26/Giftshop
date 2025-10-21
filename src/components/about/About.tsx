'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

// Counter animation hook
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return { count, ref };
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Animation variants
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInLeft = {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInRight = {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const values = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Our Mission",
      description: "To bring warmth and tranquility to every home through premium handcrafted candles at affordable prices.",
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Our Vision", 
      description: "To become India's most trusted candle brand, creating memorable experiences through exceptional fragrances.",
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Quality Promise",
      description: "Every candle is handcrafted with premium soy wax, natural essential oils, and cotton wicks for a clean burn.",
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 9.5l15 15" />
        </svg>
      ),
      title: "Sustainability",
      description: "Eco-friendly materials, recyclable packaging, and sustainable practices for a greener tomorrow.",
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community First",
      description: "Building a community of candle lovers through workshops, custom orders, and personalized gifts.",
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Trust & Security",
      description: "100% secure payments, easy returns, and complete customer satisfaction guarantee.",
    },
  ];

  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with just 50 handcrafted candles" },
    { year: "2021", event: "10K Customers", description: "Reached our first milestone" },
    { year: "2022", event: "Pan-India Delivery", description: "Expanded to all 28 states" },
    { year: "2023", event: "Eco Certified", description: "Received eco-friendly certification" },
    { year: "2024", event: "5000+ Candles", description: "Largest scented candle collection" },
  ];

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      bio: "Aromatherapy expert with 15 years in fragrance industry",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      linkedin: "#",
    },
    {
      name: "Priya Patel",
      role: "Chief Fragrance Officer",
      bio: "Master perfumer trained in Paris",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      linkedin: "#",
    },
    {
      name: "Arjun Singh",
      role: "Chief Technology Officer",
      bio: "Ex-Amazon, Built e-commerce platforms for millions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      linkedin: "#",
    },
    {
      name: "Sneha Reddy",
      role: "Head of Operations",
      bio: "Supply chain expert with 10+ years experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      linkedin: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
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
              About Us
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Passionate about candles, driven by community, committed to excellence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Animated Story Section */}
      <section id="our-story" className="py-20 md:py-12 bg-gradient-to-b from-white to-[#F0EEED]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="text-gray-700 font-semibold text-lg mb-4 block uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Our Journey
              </motion.span>
              
              <motion.h2 
                className={cn([
                  integralCF.className,
                  "text-4xl md:text-5xl text-black mb-8 uppercase"
                ])}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                From a dream to Indias favorite candle store
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-black/70 text-lg leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>
                  What started as a small dream in a Mumbai apartment has grown into India's 
                  most loved candle brand. Our founder, Rahul Sharma, a passionate aromatherapy 
                  enthusiast, noticed how difficult it was to find quality handcrafted candles at reasonable prices.
                </p>
                <p>
                  In 2020, during the pandemic, when the world turned to candles for comfort and 
                  peace, we launched with just 50 handcrafted candles. Today, we're proud to offer over 
                  5,000 premium scented candles across 100+ fragrances, serving customers in every corner of India.
                </p>
                <p>
                  But we're more than just a candle store. We're building a community of fragrance lovers, 
                  hosting candle-making workshops, custom orders, and gifting solutions. We believe that 
                  candles have the power to transform spaces and moods, and we're committed to making that 
                  experience accessible to everyone.
                </p>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center gap-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                  <p className="text-3xl text-gray-700 font-extrabold">4.9/5</p>
                  <p className="text-black/60 font-medium">Average Rating</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                  <p className="text-3xl text-gray-700 font-extrabold">20K+</p>
                  <p className="text-black/60 font-medium">Reviews</p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Animated Image Grid */}
            <motion.div 
              className="relative"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://images.unsplash.com/photo-1602874801006-95926fc7e8b8?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=300&fit=crop",
                ].map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt={`Candle Gallery ${index + 1}`}
                    className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
                      index % 2 === 1 ? 'mt-8' : ''
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Timeline Section */}
      <section className="py-20 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black mb-4 uppercase"
            ])}>
              Our Milestones
            </h2>
            <p className="text-xl text-black/70">
              Key moments in our journey of growth
            </p>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-900"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-1/2 px-8">
                    <motion.div 
                      className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
                        index % 2 === 0 ? 'text-right' : 'text-left'
                      }`}
                      whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -1 : 1 }}
                    >
                      <span className="text-gray-700 text-2xl font-extrabold">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-black mt-2">{milestone.event}</h3>
                      <p className="text-black/60 mt-2">{milestone.description}</p>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-800 rounded-full flex items-center justify-center z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </motion.div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Values Section */}
      <section className="py-20 md:py-10 bg-gradient-to-b from-[#F0EEED] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="text-gray-700 font-semibold text-lg mb-4 block uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.span>
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black mb-4 uppercase"
            ])}>
              What Drives Us Forward
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Our core values guide every decision we make and every candle we craft
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all group"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="text-gray-700 mb-6"
                  initial={{ rotate: -180, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {value.icon}
                </motion.div>
                <h3 className={cn([integralCF.className, "text-2xl text-black mb-4"])}>
                  {value.title}
                </h3>
                <p className="text-black/60 leading-relaxed text-lg">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Team Section */}
      <section className="py-20 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="text-gray-700 font-semibold text-lg mb-4 block uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Leadership
            </motion.span>
            <h2 className={cn([
              integralCF.className,
              "text-4xl md:text-5xl text-black mb-4 uppercase"
            ])}>
              Meet the Visionaries
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Passionate leaders with decades of combined experience in fragrance, aromatherapy, and e-commerce
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-3xl mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <motion.a 
                        href={member.linkedin} 
                        className="text-white hover:text-gray-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className={cn([integralCF.className, "text-2xl text-black mb-2"])}>
                    {member.name}
                  </h3>
                  <p className="text-gray-700 font-semibold mb-3">{member.role}</p>
                  <p className="text-black/60 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <motion.section 
        className="py-20 md:py-32 bg-black text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gray-700/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className={cn([
              integralCF.className,
              "text-4xl md:text-5xl lg:text-6xl mb-6 uppercase"
            ])}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Light Up Your Space?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of happy customers who have made us their trusted candle companion. 
            Your perfect fragrance is just a click away!
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/shop"
                className="inline-block bg-white text-black px-10 py-5 rounded-full hover:bg-white/90 transition-all font-bold text-lg"
              >
                Explore 5,000+ Candles
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact"
                className="inline-block border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all font-bold text-lg"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;