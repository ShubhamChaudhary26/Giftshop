'use client';

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  data: Product;
  className?: string;
};

// Gradient colors matching categories
const gradients = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-red-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-teal-500 to-cyan-500",
];

const ProductCard = ({ data, className }: ProductCardProps) => {
  const createSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const discountPercentage =
    data.discount_percentage || data.discount?.percentage || 0;
  const discountAmount = data.discount_amount || data.discount?.amount || 0;

  const calculateFinalPrice = () => {
    const basePrice = data.price || 0;

    if (discountPercentage > 0) {
      return Math.round(basePrice - (basePrice * discountPercentage) / 100);
    }
    if (discountAmount > 0) {
      return Math.round(basePrice - discountAmount);
    }
    return basePrice;
  };

  const finalPrice = calculateFinalPrice();
  const hasDiscount = discountPercentage > 0 || discountAmount > 0;

  const imageUrl = data.src_url || data.srcUrl || data.image_url || "";
  const fallbackImage = "https://via.placeholder.com/400x400/f0f0f0/666666?text=No+Image";
  
  // Random gradient for each product
  const gradient = gradients[data.id % gradients.length];

  return (
    <Link
      href={`/shop/product/${data.id}/${createSlug(data.title || "product")}`}
      className={cn([
        "group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl duration-500 hover:-translate-y-2",
        className
      ])}
    >
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden bg-white flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data.title || "Product"}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            quality={85}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                🎁
              </div>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay on Hover */}
        <div className={cn([
          "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-70 transition-opacity duration-500",
          gradient
        ])} />

        {/* Arrow Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between p-3 md:p-4 lg:p-5 flex-1 min-h-[140px] md:min-h-[160px] bg-gradient-to-b from-white to-pink-50/30">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 text-gray-900 line-clamp-2">
            {data.title || "Untitled Product"}
          </h3>

          {/* Author */}
          {data.author && (
            <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-1">
              by {data.author}
            </p>
          )}

          {/* Rating */}
          {data.rating && data.rating > 0 && (
            <div className="flex items-center mb-2">
              <Rating
                initialValue={data.rating}
                allowFraction
                SVGclassName="inline-block"
                size={14}
                readonly
                fillColor="#FF6B9D"
                emptyColor="#FDE6E6"
              />
              <span className="text-gray-600 text-xs ml-1 font-semibold">
                {data.rating.toFixed(1)}
                <span className="text-gray-400">/5</span>
              </span>
            </div>
          )}
        </div>
        
        {/* Price Section */}
        <div className="flex items-center justify-between pt-2 border-t border-pink-100">
          <div className="flex flex-col">
            <span className="text-sm md:text-base lg:text-lg font-bold bg-rose-500 bg-clip-text text-transparent">
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-xs md:text-sm text-gray-400 line-through">
                ₹{(data.price || 0).toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-rose-500 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;