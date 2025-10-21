// components/common/ProductCard.tsx
'use client';

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
  className?: string;
};

const ProductCard = ({ data, className }: ProductCardProps) => {
  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // ✅ Fixed: Use database column names
  const discountPercentage = data.discount_percentage || data.discount?.percentage || 0;
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

  // ✅ FIXED: Support both src_url (database) and srcUrl (mapped data)
  const imageUrl = data.src_url || data.srcUrl || data.image_url || '';
  const fallbackImage = 'https://via.placeholder.com/400x600/f0f0f0/666666?text=No+Image';

  // Debug log (remove after testing)
  console.log('ProductCard Image:', {
    title: data.title,
    src_url: data.src_url,
    srcUrl: data.srcUrl,
    final: imageUrl
  });

  return (
    <Link
      href={`/shop/product/${data.id}/${createSlug(data.title || 'product')}`}
      className={`flex flex-col items-start bg-white rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group ${className || ''}`}
    >
      {/* Product Image */}
      <div className="w-full aspect-[3/4] overflow-hidden relative flex items-center justify-center bg-gray-50 rounded-md">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={data.title || 'Product'} 
            fill 
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105" 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={85}
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl sm:text-6xl text-gray-300">
            📚
          </div>
        )}
        
        {/* Discount Badge */}
        {/* {hasDiscount && (
          <div className="absolute top-2 left-2 bg-[#FF3333] text-white text-[10px] sm:text-xs py-1 px-2 rounded-full font-bold">
            {discountPercentage > 0 ? `-${discountPercentage}%` : `-₹${discountAmount}`}
          </div>
        )} */}

        {/* New Arrival Badge */}
        {/* {data.is_new_arrival && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] sm:text-xs py-1 px-2 rounded-full font-bold">
            New
          </div>
        )} */}
      </div>

      {/* Product Title */}
      <strong className="mt-2 text-sm sm:text-base font-semibold text-black line-clamp-2 leading-snug h-[40px] sm:h-[48px] w-full">
        {data.title || 'Untitled Product'}
      </strong>

      {/* Author */}
      {data.author && (
        <p className="text-xs text-gray-600 mb-1 line-clamp-1">
          by {data.author}
        </p>
      )}

      {/* Rating */}
      {data.rating && data.rating > 0 ? (
        <div className="flex items-center mb-1">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-100"
            size={16}
            readonly
          />
          <span className="text-black text-xs ml-1.5">
            {data.rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
      ) : null}

      {/* Price */}
      <div className="flex items-center flex-wrap gap-2 mt-auto">
        <span className="font-bold text-base sm:text-lg text-black">
          ₹{finalPrice.toLocaleString('en-IN')}
        </span>

        {hasDiscount && (
          <>
            <span className="font-medium text-gray-400 line-through text-sm sm:text-base">
              ₹{(data.price || 0).toLocaleString('en-IN')}
            </span>

            <span className="text-[10px] sm:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333] font-medium">
              {discountPercentage > 0 ? `-${discountPercentage}%` : `-₹${discountAmount}`}
            </span>
          </>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;