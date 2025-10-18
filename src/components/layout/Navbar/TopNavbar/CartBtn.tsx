'use client';

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartBtn = () => {
  const { cart } = useAppSelector((state) => (state as RootState).carts);
  const [prevQuantity, setPrevQuantity] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cart && cart.totalQuantities > prevQuantity) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500); // animation duration
      return () => clearTimeout(timer);
    }
    setPrevQuantity(cart?.totalQuantities || 0);
  }, [cart?.totalQuantities, prevQuantity]);

  return (
    <Link href="/cart" className="relative mr-[14px] p-1">
      <motion.div
        animate={animate ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          priority
          src="/icons/cart.svg"
          height={100}
          width={100}
          alt="cart"
          className="max-w-[22px] max-h-[22px]"
        />
        {cart && cart.totalQuantities > 0 && (
          <span className="border bg-black text-white rounded-full w-fit-h-fit px-1 text-xs absolute -top-3 left-1/2 -translate-x-1/2">
            {cart.totalQuantities}
          </span>
        )}
      </motion.div>
    </Link>
  );
};

export default CartBtn;
