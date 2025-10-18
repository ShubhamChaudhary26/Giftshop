'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const bookBrandsData = [
  { id: "oreilly", name: "O'Reilly Media", srcUrl: "/icons/oreilly.png" },
  { id: "packt", name: "Packt Publishing", srcUrl: "/icons/packt.png" },
  { id: "apress", name: "Apress", srcUrl: "/icons/apress.png" },
  { id: "manning", name: "Manning Publications", srcUrl: "/icons/manning.png" },
  { id: "pearson", name: "Pearson Education", srcUrl: "/icons/pearson.png" },
  { id: "wiley", name: "Wiley", srcUrl: "/icons/wiley.png" },
];

const AnimatedCounter = ({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
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
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const RelatedBrands = () => {
  return (
    <section className="py-8 sm:py-10 bg-black">
      {/* Stats Section - hidden on mobile */}
      <div className="hidden sm:block max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { number: 50, suffix: "+", label: "Publishers" },
            { number: 10000, suffix: "+", label: "Authors" },
            { number: 25, suffix: "+", label: "Countries" },
            { number: 100000, suffix: "+", label: "Titles" },
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
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={2} />
              </motion.p>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Brands */}
      <div className="mt-4 sm:mt-10 py-2 sm:py-5 overflow-hidden">
        <motion.div
          className="flex gap-4 sm:gap-8"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...bookBrandsData, ...bookBrandsData].map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex-shrink-0">
              <div className="bg-gray-900 rounded-md sm:rounded-xl px-3 sm:px-8 py-1.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400 hover:text-white transition-all">
                {brand.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedBrands;
