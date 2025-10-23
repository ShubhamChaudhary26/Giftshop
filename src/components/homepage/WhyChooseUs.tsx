'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Shield, 
  Sparkles, 
  Heart, 
  Gift, 
  Zap,
  Award,
  Headphones 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Only the finest materials for gifts that last forever",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "100% Personalized",
      description: "Upload photos, add names - make it uniquely yours",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Express shipping available - get it in 24-48 hours",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "100% safe & encrypted payment gateway",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Gift Wrapping",
      description: "Beautiful premium packaging included free",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Customization",
      description: "See live preview before ordering",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "Not happy? 100% money-back guarantee",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always here to help with your orders",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-10 overflow-hidden bg-[#fff9fb]">
      {/* Background Pattern */}
      
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-2 rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Why BestGiftEver?</span>
          </div> */}
          <h2 className={cn([integralCF.className, "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 gradient-text"])}>
            WHAT MAKES US SPECIAL
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Over 50,000 happy customers trust us for their perfect personalized gifts
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={cn([
                "relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full",
                "border-2 border-transparent hover:border-gift-pink"
              ])}>
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={cn([
                    "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
                    `bg-gradient-to-br ${feature.color}`,
                    "text-white shadow-lg"
                  ])}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gift-pink transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className={cn([
                  "absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-full",
                  `bg-gradient-to-br ${feature.color}`
                ])} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;