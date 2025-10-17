// components/common/ProductCard.tsx
import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  // Create URL-friendly slug
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <Link
      href={`/shop/product/${data.id}/${createSlug(data.title)}`}
      className="flex flex-col items-start bg-white rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
    >
      {/* Rest of your component code remains the same */}
      <div className="w-full aspect-[3/4] overflow-hidden relative flex items-center justify-center bg-gray-50 rounded-md">
        <Image 
          src={data.srcUrl} 
          alt={data.title} 
          fill 
          className="object-contain transition-transform duration-500 ease-in-out" 
          priority 
        />
      </div>

      <strong className="mt-2 text-sm sm:text-base font-semibold text-black line-clamp-2 leading-snug h-[40px] sm:h-[48px]">
        {data.title}
      </strong>

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

      <div className="flex items-center flex-wrap gap-2">
        <span className="font-bold text-base sm:text-lg text-black">
          ₹
          {data.discount.percentage > 0
            ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
            : data.discount.amount > 0
            ? data.price - data.discount.amount
            : data.price}
        </span>

        {(data.discount.percentage > 0 || data.discount.amount > 0) && (
          <span className="font-medium text-gray-400 line-through text-sm sm:text-base">
            ₹{data.price}
          </span>
        )}

        {(data.discount.percentage > 0 || data.discount.amount > 0) && (
          <span className="text-[10px] sm:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333] font-medium">
            {data.discount.percentage > 0
              ? `-${data.discount.percentage}%`
              : `-₹${data.discount.amount}`}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;