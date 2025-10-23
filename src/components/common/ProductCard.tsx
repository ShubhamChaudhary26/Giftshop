'use client';

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Sparkles } from "lucide-react";

type ProductCardProps = {
  data: Product;
  className?: string;
};

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
  const fallbackImage =
    "https://via.placeholder.com/400x600/f0f0f0/666666?text=No+Image";

  return (
    <Link
      href={`/shop/product/${data.id}/${createSlug(data.title || "product")}`}
      className={`flex flex-col items-start bg-white rounded-2xl 
      p-2 sm:p-3 md:p-4 
      shadow-md hover:shadow-gift-lg transition-all duration-300 ease-in-out group 
      border-2 border-pink-100 hover:border-purple-300 
      w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] 
      ${className || ""}`}
    >
      {/* Product Image */}
      <div className="w-full aspect-[3/4] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data.title || "Product"}
            fill
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
            quality={85}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl sm:text-6xl text-pink-300">
            🎁
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] sm:text-xs py-1 px-2 rounded-full font-bold shadow-lg">
            {discountPercentage > 0
              ? `-${discountPercentage}%`
              : `-₹${discountAmount}`}
          </div>
        )}

        {/* New Arrival Badge */}
        {data.is_new_arrival && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] sm:text-xs py-1 px-2 rounded-full font-bold shadow-lg">
            <Sparkles className="w-2.5 h-2.5" />
            New
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-2 sm:p-3 w-full">
        {/* Title */}
        <strong
          className="mt-2 text-sm sm:text-base md:text-lg font-bold 
          bg-gradient-to-r from-pink-600 to-purple-600 
          bg-clip-text text-transparent 
          line-clamp-2 leading-snug 
          h-[40px] sm:h-[48px] md:h-[52px] w-full 
          transition-all"
        >
          {data.title || "Untitled Product"}
        </strong>

        {/* Author */}
        {data.author && (
          <p className="text-xs sm:text-sm text-gray-500 mb-1 line-clamp-1">
            by {data.author}
          </p>
        )}

        {/* Rating */}
        {data.rating && data.rating > 0 ? (
          <div className="flex items-center mb-2">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              size={16}
              readonly
              fillColor="#FF6B9D"
              emptyColor="#FDE6E6"
            />
            <span className="text-gray-600 text-xs sm:text-sm ml-1.5 font-semibold">
              {data.rating.toFixed(1)}
              <span className="text-gray-400">/5</span>
            </span>
          </div>
        ) : (
          <div className="h-6 mb-2"></div>
        )}

        {/* Price */}
        <div className="flex items-center flex-wrap gap-2 mt-auto pt-2 border-t border-pink-100">
          <span className="font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>

          {hasDiscount && (
            <span className="font-medium text-gray-400 line-through text-sm sm:text-base md:text-lg">
              ₹{(data.price || 0).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
