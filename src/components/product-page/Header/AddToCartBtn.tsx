"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";
import { ShoppingCart } from "lucide-react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const handleAddToCart = () => {
    const cartItem = {
      id: data.id,
      name: data.title || 'Untitled Product',
      srcUrl: data.srcUrl || data.src_url || '',
      price: data.price || 0,
      attributes: [
        sizeSelection || 'Default',
        colorSelection?.name || 'Default'
      ],
      discount: {
        amount: data.discount?.amount || data.discount_amount || 0,
        percentage: data.discount?.percentage || data.discount_percentage || 0,
      },
      quantity: data.quantity || 1,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <button
      type="button"
      className="group w-full ml-3 sm:ml-5 rounded-full h-auto py-3 md:py-3.5 text-sm sm:text-base text-white hover:shadow-gift-lg transition-all duration-300 font-bold bg-rose-500 flex items-center justify-center gap-2"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;