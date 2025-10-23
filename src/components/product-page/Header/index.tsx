import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";
import { Star, TrendingUp, Sparkles, CheckCircle, XCircle } from "lucide-react";

const Header = ({ data }: { data: Product }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <PhotoSection data={data} />
      </div>
      <div className="flex flex-col">
        {/* Title */}
        <h1
          className="text-2xl md:text-[40px] md:leading-[44px] mb-2 capitalize font-bold font-bold bg-rose-500 bg-clip-text text-transparent"
        >
          {data.title}
        </h1>

        {/* Author */}
        {data.author && (
          <p className="text-lg text-gray-600 mb-3">
            by <span className="font-semibold text-gray-800">{data.author}</span>
          </p>
        )}

        {/* Rating */}
        {data.rating && data.rating > 0 && (
          <div className="flex items-center mb-4 sm:mb-5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              size={25}
              readonly
              fillColor="#FFC700"
              emptyColor="#F0F0F0"
            />
            <span className="text-gray-800 text-sm sm:text-base ml-[11px] sm:ml-[13px] font-bold">
              {data.rating.toFixed(1)}
              <span className="text-gray-500">/5</span>
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-black text-3xl sm:text-[40px]">
            ₹{finalPrice.toLocaleString('en-IN')}
          </span>

          {hasDiscount && (
            <>
              <span className="font-bold text-gray-400 line-through text-2xl sm:text-[32px]">
                ₹{data.price.toLocaleString('en-IN')}
              </span>
              
              <span className="font-bold text-lg sm:text-xl py-1.5 px-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md">
                {discountPercentage > 0 
                  ? `-${discountPercentage}%` 
                  : `-₹${discountAmount}`}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
          {data.description || `Experience the joy of gifting with "${data.title}". This carefully curated product offers a personal touch and lasting memories. Perfect for all occasions.`}
        </p>
        
        {/* Stock Status */}
        {data.stock !== undefined && (
          <div className="mb-5">
            {data.stock > 0 ? (
              <div className="flex items-center gap-2 bg-green-100/80 border border-green-200 text-green-700 font-semibold px-4 py-2 rounded-lg w-fit">
                <CheckCircle className="w-5 h-5" />
                <span>In Stock ({data.stock} available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-100/80 border border-red-200 text-red-700 font-semibold px-4 py-2 rounded-lg w-fit">
                <XCircle className="w-5 h-5" />
                <span>Out of Stock</span>
              </div>
            )}
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {data.is_featured && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-md">
              <Star className="w-3 h-3" /> Featured
            </span>
          )}
          {data.is_new_arrival && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold shadow-md">
              <Sparkles className="w-3 h-3" /> New Arrival
            </span>
          )}
          {data.is_top_selling && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-xs font-bold shadow-md">
              <TrendingUp className="w-3 h-3" /> Top Selling
            </span>
          )}
        </div>

        <hr className="h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-5" />

        {/* Add to Cart */}
        <AddToCardSection data={data} />
      </div>
    </div>
  );
};

export default Header;