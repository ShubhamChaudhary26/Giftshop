// components/product-page/Header.tsx
import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <PhotoSection data={data} />
      </div>
      <div>
        {/* Title */}
        <h1
          className={cn([
            integralCF.className,
            "text-2xl md:text-[40px] md:leading-[40px] mb-2 capitalize",
          ])}
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

        {/* Price */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          {data.discount.percentage > 0 ? (
            <span className="font-bold text-black text-2xl sm:text-[32px]">
              {`₹${Math.round(
                data.price - (data.price * data.discount.percentage) / 100
              )}`}
            </span>
          ) : data.discount.amount > 0 ? (
            <span className="font-bold text-black text-2xl sm:text-[32px]">
              {`₹${data.price - data.discount.amount}`}
            </span>
          ) : (
            <span className="font-bold text-black text-2xl sm:text-[32px]">
              ₹{data.price}
            </span>
          )}

          {(data.discount.percentage > 0 || data.discount.amount > 0) && (
            <>
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ₹{data.price}
              </span>
              
              {data.discount.percentage > 0 ? (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-${data.discount.percentage}%`}
                </span>
              ) : (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-₹${data.discount.amount}`}
                </span>
              )}
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-black/60 mb-5">
          {data.description || `Experience the joy of reading with "${data.title}". This carefully curated book offers valuable insights and knowledge. Perfect for book lovers and those seeking to expand their understanding.`}
        </p>

        {/* Stock Status */}
        {data.stock !== undefined && (
          <div className="mb-5">
            {data.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-600 font-medium">In Stock ({data.stock} available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </div>
            )}
          </div>
        )}

        <hr className="h-[1px] border-t-black/10 mb-5" />

        {/* Add to Cart */}
        <AddToCardSection data={data} />
      </div>
    </div>
  );
};

export default Header;