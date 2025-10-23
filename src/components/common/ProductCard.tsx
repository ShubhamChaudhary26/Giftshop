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
    "https://via.placeholder.com/400x400/f0f0f0/666666?text=No+Image";

  return (
    <Link
      href={`/shop/product/${data.id}/${createSlug(data.title || "product")}`}
      className={`flex flex-col items-start bg-white rounded-2xl 
      p-2 sm:p-3 
      shadow-md  transition-all duration-300 ease-in-out group 
      border-2  hover:border-rose-300 
      w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[440px]
      ${className || ""}`}
    >
      {/* Product Image */}
      <div className="w-full aspect-[1/1] sm:aspect-[4/5] md:aspect-[4/5] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data.title || "Product"}
            fill
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
            quality={80}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl text-pink-300">
            🎁
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-2 sm:p-3 w-full">
        {/* Title */}
        <strong
          className="mt-2 text-sm sm:text-base md:text-lg font-bold 
          bg-gray-900
          bg-clip-text text-transparent 
          line-clamp-2 leading-snug 
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
              size={14}
              readonly
              fillColor="#FF6B9D"
              emptyColor="#FDE6E6"
            />
            <span className="text-gray-600 text-xs sm:text-sm ml-1 font-semibold">
              {data.rating.toFixed(1)}
              <span className="text-gray-400">/5</span>
            </span>
          </div>
        ) : (
          <div className="h-5 mb-2"></div>
        )}

        {/* Price */}
        <div className="flex items-center flex-wrap gap-2 mt-auto pt-2 border-t border-rose-100">
          <span className="font-bold text-sm sm:text-base md:text-lg bg-rose-500 bg-clip-text text-transparent">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>

          {hasDiscount && (
            <span className="font-medium text-gray-400 line-through text-xs sm:text-sm md:text-base">
              ₹{(data.price || 0).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
