import React from "react";
import Rating from "../ui/Rating";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Review } from "@/types/review.types";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  blurChild?: React.ReactNode;
  isAction?: boolean;
  isDate?: boolean;
  data: Review;
  className?: string;
};

const ReviewCard = ({
  blurChild,
  isAction = false,
  isDate = false,
  data,
  className,
}: ReviewCardProps) => {
  return (
    <div
      className={cn([
        "relative bg-white/90 backdrop-blur-sm flex flex-col items-start aspect-auto border-2 border-pink-200 hover:border-rose-500 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden transition-all duration-300 ",
        className,
      ])}
    >
      {blurChild && blurChild}
      
      <div className="w-full flex items-center justify-between mb-3 sm:mb-4">
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          size={23}
          readonly
          fillColor="#FF6B9D" // Pink color for stars
          emptyColor="#E0E0E0"
        />
        {isAction && (
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-pink-100 transition-colors duration-300"
          >
            <IoEllipsisHorizontal className="text-pink-400 hover: text-2xl transition-colors duration-300" />
          </Button>
        )}
      </div>

      <div className="flex items-center mb-2 sm:mb-3">
        <strong className="font-bold bg-rose-500 bg-clip-text text-transparent sm:text-xl mr-1 font-bold">
          {data.user}
        </strong>
        <IoIosCheckmarkCircle className="text-[#01AB31] text-xl sm:text-2xl flex-shrink-0" />
      </div>

      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {data.content}
      </p>

      {isDate && (
        <p className="font-bold bg-rose-500 bg-clip-text text-transparent text-sm font-semibold mt-4 sm:mt-6">
          Posted on {data.date}
        </p>
      )}

      {/* Decorative Gradient Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
};

export default ReviewCard;