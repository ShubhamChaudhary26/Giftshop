"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";

// ✅ Redux
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/store/cartsSlice";

declare let Razorpay: any;

export default function CartPage() {
  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice ?? 0);
  const adjustedTotalPrice = useAppSelector((state: RootState) => state.carts.adjustedTotalPrice ?? 0);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load Razorpay script dynamically
  useEffect(() => {
    if (!document.querySelector("#razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    if (!name || !phone || !address) {
      alert("Please fill all your details before proceeding.");
      return;
    }

    const items = cart?.items ?? [];
    const currentItems = items.map(item => ({ ...item }));

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(adjustedTotalPrice) * 100,
      currency: "INR",
      name: "Candle Store",
      description: "Purchase Candle",
      handler: (response: any) => {
        // Prepare WhatsApp message using snapshot
        const productsList = currentItems
          .map((p) => `- ${p.name} x ${p.quantity}`)
          .join("\n");

        const message = `New order received!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal Paid: ₹${Math.round(
          adjustedTotalPrice
        )}\nPayment ID: ${response.razorpay_payment_id}\n\nProducts:\n${productsList}`;

        // Clear cart first
        dispatch(clearCart());

        // Open WhatsApp after cart is cleared
        setTimeout(() => {
          const whatsappNumber = "7777909218"; // apna number
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`;
          window.open(whatsappUrl, "_blank");
        }, 300);
      },
      prefill: {
        name,
        contact: phone,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  const items = cart?.items ?? [];

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              Your Cart
            </h2>

            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              {/* Cart Items */}
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && <hr className="border-t-black/10" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Order Summary & Checkout */}
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">Order Summary</h6>

                {/* User Details */}
                <div className="flex flex-col space-y-3 mb-5">
                  <InputGroup>
                    <InputGroup.Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </InputGroup>
                </div>

                {/* Pricing */}
                <div className="flex flex-col space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">₹{totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Discount (-{Math.round(((totalPrice - adjustedTotalPrice) / totalPrice) * 100)}%)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -₹{Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Delivery Fee</span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">₹{Math.round(adjustedTotalPrice)}</span>
                  </div>
                </div>

                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4"
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
