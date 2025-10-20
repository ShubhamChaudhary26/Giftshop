'use client'
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { 
  Package, 
  Gift, 
  CreditCard, 
  RefreshCcw, 
  Headphones,
  BookOpen,
  Calendar,
  Smartphone,
  Mic,
  PenTool,
  Tag,
  Search,
  ShoppingCart,
  MapPin,
  BookMarked,
  Award,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Zap,
  Heart,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { reviewsData } from "@/lib/static-data";
import Reviews from "../homepage/Reviews";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Services offered by bookstore
  const services = [
    {
      icon: Package,
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
      icon: Gift,
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
      icon: CreditCard,
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
      icon: RefreshCcw,
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
      icon: Headphones,
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
    { icon: BookOpen, title: "Book Recommendations", desc: "Personalized suggestions based on your reading history" },
    { icon: Calendar, title: "Pre-Orders", desc: "Be the first to get upcoming releases" },
    { icon: Smartphone, title: "E-Books", desc: "Digital versions available for instant reading" },
    { icon: Mic, title: "Audiobooks", desc: "Listen to your favorite books on the go" },
    { icon: PenTool, title: "Author Events", desc: "Meet your favorite authors at exclusive events" },
    { icon: Tag, title: "Member Benefits", desc: "Special discounts and early access for members" }
  ];

  // How it works
  const process = [
    { step: "01", title: "Browse", desc: "Explore our collection", icon: Search },
    { step: "02", title: "Order", desc: "Add to cart & checkout", icon: ShoppingCart },
    { step: "03", title: "Track", desc: "Real-time tracking", icon: MapPin },
    { step: "04", title: "Enjoy", desc: "Start reading!", icon: BookMarked }
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized as India's #1 online bookstore for 3 consecutive years"
    },
    {
      icon: TrendingUp,
      title: "Fastest Growing",
      description: "500K+ happy customers and growing every day"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Book enthusiasts helping you find your perfect read"
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Express delivery in metro cities within 24-48 hours"
    },
    {
      icon: Shield,
      title: "100% Authentic",
      description: "Original books sourced directly from publishers"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Seamless browsing experience with instant search"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Book Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "The bulk order service is fantastic! Got amazing discounts for my book club. Highly recommended!"
    },
    {
      name: "Rahul Mehta",
      role: "College Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Love the gift wrapping service! Made my friend's birthday extra special. The packaging was beautiful."
    },
    {
      name: "Anjali Desai",
      role: "Teacher",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "Customer support is excellent! They helped me track my order and resolved my query within minutes."
    }
  ];

  // Statistics
  const stats = [
    { icon: Users, number: "500K+", label: "Happy Customers" },
    { icon: BookOpen, number: "50K+", label: "Books Available" },
    { icon: Package, number: "1M+", label: "Orders Delivered" },
    { icon: Star, number: "4.8/5", label: "Average Rating" }
  ];

  // FAQs
  const faqs = [
    {
      question: "What is your delivery time?",
      answer: "We offer express delivery in metro cities within 24-48 hours. For other locations, delivery typically takes 3-5 business days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. However, we're working on expanding our services internationally soon."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. If you're not satisfied with your purchase, we'll arrange a free pickup and process your refund immediately."
    },
    {
      question: "Are the books original?",
      answer: "Yes, 100%! All our books are sourced directly from authorized publishers and distributors. We guarantee authenticity."
    },
    {
      question: "Do you offer EMI options?",
      answer: "Yes, we offer no-cost EMI options on orders above ₹3,000 with select credit cards and payment partners."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order from your account dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
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
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
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
                      <div className={cn([
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        selectedService === index ? "bg-white/20" : "bg-white"
                      ])}>
                        <IconComponent className={cn([
                          "w-6 h-6",
                          selectedService === index ? "text-white" : "text-black"
                        ])} />
                      </div>
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
                );
              })}
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
                    <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">
              What makes us different from others
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-white">
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
            {process.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-200" />
                  )}
                  <motion.div 
                    className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-10 h-10" />
                  </motion.div>
                  <div className="text-gray-400 text-sm mb-2">{item.step}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="mt-20">

     <Reviews data={reviewsData} />
      </div>
      {/* <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              Real experiences from real book lovers
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
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Additional Services Grid */}
      <section className="py-20 bg-white">
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
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
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
            <p className="text-gray-600 text-lg">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-700/20 blur-3xl" />
            <div className="relative">
              {/* <Heart className="w-16 h-16 mx-auto mb-6 text-red-500" /> */}
              <h2 className={cn([
                integralCF.className,
                "text-4xl md:text-5xl mb-6 uppercase"
              ])}>
                Experience Our Services
              </h2>
              <p className="text-gray-400 text-xl mb-8">
                Join thousands of satisfied customers
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/shop"
                  className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
                >
                  Start Shopping →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;