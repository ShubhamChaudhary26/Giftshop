// src/components/product-page/Header/AddToCartBtn.tsx
"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const handleAddToCart = () => {
    // ✅ Prepare safe cart item
    const cartItem = {
      id: data.id,
      name: data.title || 'Untitled Product',
      srcUrl: data.srcUrl || data.src_url || '/images/book1.webp',
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
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all duration-300 font-semibold"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;