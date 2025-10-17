'use client'
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(0);

  // Services offered by bookstore
 const services = [
   {
      icon: "📦",
      title: "Bulk Orders",
      shortDesc: "Special discounts for schools & institutions",
      longDesc: "We provide special services for educational institutions, libraries, and corporate bulk orders with attractive discounts and dedicated support.",
      features: [
        "Up to 40% discount",
        "Dedicated account manager",
        "Custom invoicing",
        "Priority processing"
      ],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop"
    },
    {
      icon: "🎁",
      title: "Gift Wrapping",
      shortDesc: "Beautiful gift wrapping for special occasions",
      longDesc: "Make your book gifts extra special with our premium gift wrapping service. Perfect for birthdays, anniversaries, and special occasions.",
      features: [
        "Premium wrapping paper",
        "Personalized messages",
        "Greeting cards",
        "Ribbon & decorations"
      ],
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop"
    },
    
    {
      icon: "💳",
      title: "Easy Payment",
      shortDesc: "Multiple secure payment options",
      longDesc: "Shop with confidence using our secure payment gateway. We accept all major payment methods including EMI options for your convenience.",
      features: [
        "Credit/Debit cards",
        "UPI & Wallets",
        "Cash on delivery",
        "No-cost EMI available"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      shortDesc: "30-day hassle-free return policy",
      longDesc: "Not satisfied with your purchase? No worries! We offer a 30-day return policy with free pickup service and instant refunds.",
      features: [
        "30-day return window",
        "Free pickup service",
        "Instant refunds",
        "No questions asked"
      ],
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"
    },
    {
      icon: "🤝",
      title: "24/7 Support",
      shortDesc: "Round-the-clock customer assistance",
      longDesc: "Our dedicated support team is available 24/7 to help you with any queries, recommendations, or issues you might have.",
      features: [
        "24/7 live chat",
        "Phone support",
        "Email assistance",
        "Book recommendations"
      ],
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
    }
];
  // Additional services
  const additionalServices = [
    { icon: "📚", title: "Book Recommendations", desc: "Personalized suggestions based on your reading history" },
    { icon: "🔄", title: "Pre-Orders", desc: "Be the first to get upcoming releases" },
    { icon: "📖", title: "E-Books", desc: "Digital versions available for instant reading" },
    { icon: "🎧", title: "Audiobooks", desc: "Listen to your favorite books on the go" },
    { icon: "✍️", title: "Author Events", desc: "Meet your favorite authors at exclusive events" },
    { icon: "🏷️", title: "Member Benefits", desc: "Special discounts and early access for members" }
  ];

  // How it works
  const process = [
    { step: "01", title: "Browse", desc: "Explore our collection", icon: "🔍" },
    { step: "02", title: "Order", desc: "Add to cart & checkout", icon: "🛒" },
    { step: "03", title: "Track", desc: "Real-time tracking", icon: "📍" },
    { step: "04", title: "Enjoy", desc: "Start reading!", icon: "📖" }
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
              We're committed to making your book buying experience seamless and enjoyable
            </motion.p>
          </motion.div>
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
              Premium services designed for book lovers
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
              <h3 className=
                "text-3xl mb-4 uppercase font-extrabold"
              >
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
              Simple steps to get your books
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
                  className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
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
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
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
            Experience Our Services
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of satisfied customers
          </motion.p>
          <motion.div
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;