'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import {
  Gift, Sparkles, Users, Star, Package, ShieldCheck, Heart, Leaf,
  BadgeCheck, Truck, Wrench, Crown, ThumbsUp, Sparkle, Layers,
} from 'lucide-react';
import Reviews from '../homepage/Reviews';

// Animated Counter
function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.35, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return { count, ref };
}

export default function AboutPage() {
  // Counters
  const { count: c1, ref: r1 } = useCounter(50000, 2.2);   // Happy customers
  const { count: c2, ref: r2 } = useCounter(100000, 2.2);  // Gifts delivered
  const { count: c3, ref: r3 } = useCounter(4900, 2.2);    // 4.9★ (x1000 formatting)

  // Cards data
  const values = [
    { icon: <Heart className="w-7 h-7" />, title: 'Made With Love', desc: 'Har gift me personal touch — photos, names & messages.', grad: 'from-pink-500 to-rose-500' },
    { icon: <ShieldCheck className="w-7 h-7" />, title: 'Secure & Trusted', desc: '100% safe payments, easy returns, fast support.', grad: 'from-purple-500 to-indigo-500' },
    { icon: <Leaf className="w-7 h-7" />, title: 'Eco Friendly', desc: 'Mindful packaging & sustainable practices.', grad: 'from-green-500 to-emerald-600' },
    { icon: <BadgeCheck className="w-7 h-7" />, title: 'Premium Quality', desc: 'High-grade materials, sharp prints & finishes.', grad: 'from-amber-500 to-orange-500' },
    { icon: <Truck className="w-7 h-7" />, title: 'Fast Delivery', desc: 'Pan-India shipping with live tracking.', grad: 'from-blue-500 to-cyan-500' },
    { icon: <Crown className="w-7 h-7" />, title: 'Top-rated', desc: '4.9★ avg. rating from verified customers.', grad: 'from-fuchsia-500 to-purple-600' },
  ];

  const categories = [
    { name: 'Personalized Mugs', slug: 'mugs', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80', grad: 'from-pink-500 to-rose-600' },
    { name: 'Photo Frames', slug: 'frames', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=900&q=80', grad: 'from-purple-500 to-indigo-600' },
    { name: 'Custom Keyrings', slug: 'keyrings', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80', grad: 'from-blue-500 to-cyan-600' },
    { name: 'Gift Sets', slug: 'gift-sets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=80', grad: 'from-amber-500 to-orange-600' },
  ];

  const steps = [
    { title: 'Pick a Product', text: 'Choose mugs, frames, keyrings & gift sets.', icon: <Layers className="w-5 h-5" /> },
    { title: 'Personalize', text: 'Add photos, names & messages in seconds.', icon: <Sparkles className="w-5 h-5" /> },
    { title: 'We Craft It', text: 'Premium print & finishing by our experts.', icon: <Wrench className="w-5 h-5" /> },
    { title: 'Delivered Fast', text: 'Pan-India delivery with live tracking.', icon: <Truck className="w-5 h-5" /> },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'Magic mug quality next level! Hubby loved it 😍', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
    { name: 'Rahul Verma', text: 'Photo frame finish is super premium. Perfect gift.', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80' },
    { name: 'Kavya Iyer', text: 'Keyring print is crystal clear, loved the packaging!', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&q=80' },
  ];

  const faqs = [
    { q: 'Delivery kitni fast hai?', a: 'Standard 3–6 days, metro cities me 2–4 days. Same-day customization on select products.' },
    { q: 'Customization kaise hoti hai?', a: 'Upload photo/add name on product page. Live preview dekh kar order place karein.' },
    { q: 'Returns/Refunds?', a: 'Manufacturing defects pe 7 days replacement. Non-custom products pe easy return.' },
  ];

  return (
    <div className="min-h-screen ">
     <div className="py-5 relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-500 to-rose-300 text-white">
  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-4">
      <Gift className="w-4 h-4" />
      <span className="text-xs font-bold uppercase">BestGiftEver</span>
    </div>

    <h1
      className={cn([
        integralCF.className,
        "text-4xl md:text-5xl uppercase mb-2 bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent",
      ])}
    >
      Gifts That Tell Your Story
    </h1>

    <p className="text-rose-50/90 mt-2 max-w-2xl">
      Personalized mugs, frames, keyrings & gift sets crafted with love — for every moment that matters
    </p>
  </div>
</div>





      {/* OUR STORY */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-white to-pink-50/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-purple-700 font-bold text-xs sm:text-sm tracking-wider uppercase mb-3 inline-block">Our Journey</span>
              <h2 className={cn(integralCF.className, 'text-3xl sm:text-4xl md:text-5xl mb-5 font-bold bg-rose-500 bg-clip-text text-transparent uppercase')}>From a Spark to a Celebration</h2>
              <div className="space-y-4 text-purple-800 leading-relaxed text-sm sm:text-base">
                <p>We started small — but dreamed big. Today, we make personalized gifts that turn everyday moments into memories.</p>
                <p>Premium quality, personal touch, fast delivery — that’s the promise we live by at BestGiftEver.</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="text-center bg-white/90 rounded-2xl border-2 border-pink-100 p-4">
                  <p className="text-2xl sm:text-3xl font-extrabold font-bold bg-rose-500 bg-clip-text text-transparent">100+</p>
                  <p className="text-purple-700 font-semibold text-xs sm:text-sm">Cities Served</p>
                </div>
                <div className="text-center bg-white/90 rounded-2xl border-2 border-pink-100 p-4">
                  <p className="text-2xl sm:text-3xl font-extrabold font-bold bg-rose-500 bg-clip-text text-transparent">5,000+</p>
                  <p className="text-purple-700 font-semibold text-xs sm:text-sm">Gift Options</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=900&q=80',
                'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80',
                'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=80',
                'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80',
              ].map((src, i) => (
                <div key={i} className={cn('overflow-hidden rounded-2xl shadow-md', i % 2 === 1 ? 'mt-6' : '')}>
                  <Image src={src} alt={`Gallery ${i + 1}`} width={900} height={700} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-rose-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              <Package className="w-4 h-4" /> Shop by Categories
            </span>
            <h3 className={cn(integralCF.className, 'mt-4 text-3xl sm:text-4xl md:text-5xl font-bold bg-rose-500 bg-clip-text text-transparent uppercase')}>Find Your Perfect Gift</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/shop/${cat.slug}`} className="group relative rounded-2xl overflow-hidden border-2 border-pink-100 hover:border-purple-300 shadow-md hover:shadow-gift-lg transition">
                <div className="relative aspect-square">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={cn('absolute inset-0 bg-gradient-to-t opacity-70 group-hover:opacity-90 transition', cat.grad)} />
                </div>
                <div className="absolute inset-0 p-4 flex items-end">
                  <div className="text-white">
                    <p className="text-sm font-semibold">Explore</p>
                    <h4 className="text-lg sm:text-xl font-extrabold">{cat.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* VALUES */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className={cn(integralCF.className, 'text-3xl sm:text-4xl md:text-5xl font-bold bg-rose-500 bg-clip-text text-transparent uppercase')}>Why Choose Us</h3>
            <p className="mt-3 text-purple-700 font-semibold">Everything that makes us India’s favorite</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border-2 border-pink-100 hover:border-purple-300 shadow-md hover:shadow-gift-lg transition">
                <div className={cn('w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-md mb-4', `bg-gradient-to-br ${v.grad}`)}>
                  {v.icon}
                </div>
                <h4 className={cn(integralCF.className, 'text-xl font-bold bg-rose-500 bg-clip-text text-transparent')}>{v.title}</h4>
                <p className="mt-2 text-purple-800">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<Reviews/>


     {/* CTA Section — Rose Gradient Style */}
<section className="py-14 sm:py-8 relative overflow-hidden text-white bg-gradient-to-br from-rose-600 via-rose-500 to-rose-300">
  {/* Overlay blur effect for glow */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

  <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
    <h3
      className={cn(
        integralCF.className,
        "text-3xl sm:text-4xl md:text-5xl mb-4 uppercase bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent"
      )}
    >
      Ready to Make Someone Smile?
    </h3>

    <p className="text-rose-50/90 text-base sm:text-lg mb-8">
      Pick a gift that tells your story — crafted with love, delivered with care.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/shop"
        className="bg-white text-rose-700 font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-rose-200/40 transition"
      >
        Explore Gifts
      </Link>

      <Link
        href="/contact"
        className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-rose-700 transition"
      >
        Get in Touch
      </Link>
    </div>
  </div>
</section>

    </div>
  );
}