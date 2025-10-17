'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { useRef } from "react";

// Book Publishers/Brands Data
const bookBrandsData = [
  {
    id: "oreilly",
    name: "O'Reilly Media",
    srcUrl: "/icons/oreilly.png",
  },
  {
    id: "packt",
    name: "Packt Publishing",
    srcUrl: "/icons/packt.png",
  },
  {
    id: "apress",
    name: "Apress",
    srcUrl: "/icons/apress.png",
  },
  {
    id: "manning",
    name: "Manning Publications",
    srcUrl: "/icons/manning.png",
  },
  {
    id: "pearson",
    name: "Pearson Education",
    srcUrl: "/icons/pearson.png",
  },
  {
    id: "wiley",
    name: "Wiley",
    srcUrl: "/icons/wiley.png",
  },
];


// Counter Component
const AnimatedCounter = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(target * progress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const RelatedBrands = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const bookCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
   

      {/* Stats Section with Animated Counters */}
      <section className="py-0 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { number: 50, suffix: "+", label: "Publishers" },
              { number: 10000, suffix: "+", label: "Authors" },
              { number: 25, suffix: "+", label: "Countries" },
              { number: 100000, suffix: "+", label: "Titles" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <motion.p 
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedCounter 
                    target={stat.number} 
                    suffix={stat.suffix}
                    duration={2}
                  />
                </motion.p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="mt-10 py-5 overflow-hidden">
          <motion.div 
            className="flex gap-8"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...bookBrandsData, ...bookBrandsData].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0"
              >
                <div className="bg-gray-900 rounded-xl px-8 py-4 whitespace-nowrap text-gray-400 hover:text-white transition-all">
                  {brand.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RelatedBrands;