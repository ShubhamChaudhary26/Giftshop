'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
      <motion.div 
           className="bg-black text-white py-2 text-center text-sm"
           initial={{ y: -100 }}
           animate={{ y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
             <div className="hidden md:flex items-center gap-4">
               <span>📞 +91 98765 43210</span>
               <span>✉️ support@bookstore.com</span>
             </div>
             <div className="mx-auto md:mx-0">
               <span className="animate-pulse">🎉 Free Shipping on Orders Above ₹499!</span>
             </div>
             <div className="hidden md:flex items-center gap-4">
               <Link href="/track-order" className="hover:text-purple-400 transition-colors">
                 Track Order
               </Link>
               <span>|</span>
               <Link href="/help" className="hover:text-purple-400 transition-colors">
                 Help
               </Link>
             </div>
           </div>
         </motion.div>
  );
};

export default TopBanner;
