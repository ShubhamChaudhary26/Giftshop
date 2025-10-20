'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Target, Eye, Gem, Leaf, Handshake, Shield } from "lucide-react";

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
      icon: Target,
      title: "Our Mission",
      description: "To democratize access to knowledge by making quality books affordable and accessible to every reader in India.",
    },
    {
      icon: Eye,
      title: "Our Vision", 
      description: "To become India's most trusted online bookstore, fostering a nation of readers and lifelong learners.",
    },
    {
      icon: Gem,
      title: "Quality Promise",
      description: "Every book is carefully selected, ensuring authentic editions from verified publishers only.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly packaging and carbon-neutral delivery for a greener tomorrow.",
    },
    {
      icon: Handshake,
      title: "Community First",
      description: "Building a community of readers through book clubs, author meets, and reading challenges.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "100% secure payments, easy returns, and complete data privacy protection.",
    },
  ];

  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with just 500 books" },
    { year: "2021", event: "10K Customers", description: "Reached our first milestone" },
    { year: "2022", event: "Pan-India Delivery", description: "Expanded to all 28 states" },
    { year: "2023", event: "Mobile App Launch", description: "Launched iOS & Android apps" },
    { year: "2024", event: "50K+ Books", description: "Largest online collection" },
  ];

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      bio: "IIM Ahmedabad alumnus with 15 years in publishing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      linkedin: "#",
    },
    {
      name: "Priya Patel",
      role: "Chief Content Officer",
      bio: "Former Editor at Penguin Random House",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      linkedin: "#",
    },
    {
      name: "Arjun Singh",
      role: "Chief Technology Officer",
      bio: "Ex-Amazon, Built scalable platforms for millions",
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
              Passionate about books, driven by community, committed to excellence
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
               From a dream to Indias favorite bookstore
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
                  most loved online bookstore. Our founder, Rahul Sharma, a passionate reader 
                  himself, noticed how difficult it was to find good books at reasonable prices.
                </p>
                <p>
                  In 2020, during the pandemic, when the world turned to books for comfort and 
                  knowledge, we launched with just 500 titles. Today, we're proud to offer over 
                  50,000 books across 50+ categories, serving readers in every corner of India.
                </p>
                <p>
                  But we're more than just a bookstore. We're building a community of readers, 
                  hosting author sessions, book clubs, and reading challenges. We believe that 
                  books have the power to change lives, and we're committed to making that 
                  power accessible to everyone.
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
                  <p className="text-3xl text-gray-700 font-extrabold">4.8/5</p>
                  <p className="text-black/60 font-medium">Average Rating</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                  <p className= "text-3xl text-gray-700 font-extrabold">15K+</p>
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
                  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
                ].map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt={`Gallery ${index + 1}`}
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
                      <span className= "text-gray-700 text-2xl font-extrabold">{milestone.year}</span>
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
              Our core values guide every decision we make and every book we deliver
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
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
                    className="mb-6 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center"
                    initial={{ rotate: -180, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-gray-700" strokeWidth={2} />
                  </motion.div>
                  <h3 className={cn([integralCF.className, "text-2xl text-black mb-4"])}>
                    {value.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
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
              Passionate leaders with decades of combined experience in publishing, technology, and e-commerce
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
                        className="text-white hover:text-purple-300"
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
          className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-to-yellow-400/20 rounded-full filter blur-3xl"
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
            Ready to Start Your Reading Journey?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of happy readers who have made us their trusted book companion. 
            Your next favorite book is just a click away!
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
                Explore 50,000+ Books
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