// components/product-page/Header.tsx
import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  // ✅ Safe discount calculation using database columns
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <PhotoSection data={data} />
      </div>
      <div>
        {/* Title */}
        <h1
          className="text-2xl md:text-[40px] md:leading-[40px] mb-2 capitalize font-mono font-extrabold text-black"
        >
          {data.title}
        </h1>

        {/* Author */}
        {data.author && (
          <p className="text-lg text-gray-600 mb-3">
            by <span className="font-semibold">{data.author}</span>
          </p>
        )}

        {/* Rating */}
        {data.rating && data.rating > 0 && (
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.rating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-black text-2xl sm:text-[32px]">
            ₹{finalPrice.toLocaleString('en-IN')}
          </span>

          {hasDiscount && (
            <>
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ₹{data.price.toLocaleString('en-IN')}
              </span>
              
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {discountPercentage > 0 
                  ? `-${discountPercentage}%` 
                  : `-₹${discountAmount}`}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-black/60 mb-5">
          {data.description || `Experience the joy of reading with "${data.title}". This carefully curated book offers valuable insights and knowledge. Perfect for book lovers and those seeking to expand their understanding.`}
        </p>

        {/* Category */}
        {data.category && (
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {data.category}
            </span>
          </div>
        )}

        {/* Stock Status */}
        {data.stock !== undefined && (
          <div className="mb-5">
            {data.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-600 font-medium">
                  In Stock ({data.stock} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </div>
            )}
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {data.is_featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
              ⭐ Featured
            </span>
          )}
          {data.is_new_arrival && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
              🆕 New Arrival
            </span>
          )}
          {data.is_top_selling && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              🔥 Top Selling
            </span>
          )}
        </div>

        <hr className="h-[1px] border-t-black/10 mb-5" />

        {/* Add to Cart */}
        <AddToCardSection data={data} />
      </div>
    </div>
  );
};

export default Header;