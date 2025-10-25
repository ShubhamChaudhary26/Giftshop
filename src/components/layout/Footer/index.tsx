import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import LayoutSpacing from "./LayoutSpacing";
import { Heart } from "lucide-react";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com/mohammadoftadeh",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  return (
    <footer className="">
      {/* Newsletter Section */}
      

      {/* Main Footer */}
      <div className="pt-8 sm:pt-10 md:pt-[40px] bg-[#fff9fb] px-4 pb-4 relative overflow-hidden">
        {/* Decorative gradient circles */}
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-pink-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200/30 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-frame mx-auto relative z-10">
          {/* Top Section */}
          <nav className="lg:grid lg:grid-cols-12 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px] mb-8 lg:mb-0">
              <h1
                className={cn([
                  integralCF.className,
                  "text-2xl sm:text-[28px] lg:text-[32px] mb-4 sm:mb-6 font-bold bg-rose-500 bg-clip-text text-transparent",
                ])}
              >
                BestGiftEver
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-9 leading-relaxed max-w-xs">
                We create personalized gifts that make every moment special. From custom mugs to photo frames, we help you celebrate life's precious memories.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-rose-500 hover:bg-rose-500 hover:text-white transition-all w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-pink-200 hover:border-transparent flex items-center justify-center p-1.5 shadow-md hover:shadow-gift text-sm sm:text-base"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:hidden">
              <LinksSection />
            </div>
          </nav>

          {/* Divider */}
          <hr className="h-[1px] bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 mb-4 sm:mb-6" />
          
          {/* Bottom Section */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Copyright Text */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-center sm:text-left text-gray-600 order-2 sm:order-1">
                <span className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
                  <span>BestGiftEver © Made with</span>
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-pink-500 text-pink-500 inline-block flex-shrink-0" />
                  <span>by</span>
                  <Link
                    href="https://github.com/mohammadoftadeh"
                    className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all whitespace-nowrap"
                  >
                    Arcenik Technologies
                  </Link>
                </span>
              </p>

              {/* Payment Badges */}
              <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 order-1 sm:order-2">
                {paymentBadgesData.map((badge) => (
                  <span
                    key={badge.id}
                    className="w-[42px] sm:w-[46px] h-[28px] sm:h-[30px] rounded-[5px] border-2 border-pink-200 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:border-purple-300 transition-all shadow-sm hover:shadow-md flex-shrink-0"
                  >
                    <Image
                      priority
                      src={badge.srcUrl}
                      width={33}
                      height={100}
                      alt="payment"
                      className="max-h-[12px] sm:max-h-[15px] w-auto"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;