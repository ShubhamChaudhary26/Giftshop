'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Gift, Phone, Mail, Package, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

type TopBannerProps = {
  className?: string;
  phone?: string;
  email?: string;
  message?: string;
};

export default function TopBanner({
  className,
  phone = "+91 98765 43210",
  email = "support@bestgiftever.com",
  message = "Free Shipping on Orders Above ₹499!",
}: TopBannerProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden text-white",
        // Pure pink family gradient
        "bg-rose-500",
        "py-2 text-center text-xs sm:text-sm",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* subtle animated sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-3 relative z-10">
        {/* Left: Contacts */}
        <div className="hidden md:flex items-center gap-4">
          <a
            className="flex items-center gap-1.5 hover:text-white/85 transition-colors"
            href={`tel:${phone.replace(/\s/g, "")}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">{phone}</span>
          </a>
          <span className="text-white/50">|</span>
          <a
            className="flex items-center gap-1.5 hover:text-white/85 transition-colors"
            href={`mailto:${email}`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="font-medium">{email}</span>
          </a>
        </div>

        {/* Center: Message */}
        <div className="mx-auto md:mx-0 flex items-center gap-2">
          <Gift className="w-4 h-4 animate-bounce" />
          <span className="font-bold">{message}</span>
          <Gift className="w-4 h-4 animate-bounce" />
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/track-order"
            className="flex items-center gap-1.5 hover:text-white/85 transition-colors font-medium"
          >
            <Package className="w-3.5 h-3.5" />
            Track Order
          </Link>
          <span className="text-white/50">|</span>
          <Link
            href="/help"
            className="flex items-center gap-1.5 hover:text-white/85 transition-colors font-medium"
          >
            <Headphones className="w-3.5 h-3.5" />
            Help
          </Link>
        </div>
      </div>
    </motion.div>
  );
}