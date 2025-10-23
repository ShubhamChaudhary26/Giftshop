'use client';

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const CartBtn = () => {
  const { cart } = useAppSelector((state) => (state as RootState).carts);
  const [prevQuantity, setPrevQuantity] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cart && cart.totalQuantities > prevQuantity) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevQuantity(cart?.totalQuantities || 0);
  }, [cart?.totalQuantities, prevQuantity]);

  return (
    <Link href="/cart" className="relative">
      <motion.div
        animate={animate ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-purple-100 hover:from-rose-200 hover:to-purple-200 transition-all shadow-md hover:shadow-gift"
      >
        <ShoppingCart className="w-5 h-5 text-rose-600" />
        
        {cart && cart.totalQuantities > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-lg border-2 border-white"
          >
            {cart.totalQuantities > 99 ? '99+' : cart.totalQuantities}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default CartBtn;