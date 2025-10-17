"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/store/cartsSlice";
import dynamic from "next/dynamic";

declare let Razorpay: any;

// Memoized Empty Cart Component
const EmptyCart = memo(() => (
  <div className="flex items-center flex-col text-gray-300 mt-32">
    <TbBasketExclamation strokeWidth={1} className="text-6xl" />
    <span className="block mb-4">Your shopping cart is empty.</span>
    <Button className="rounded-full w-24" asChild>
      <Link href="/shop">Shop</Link>
    </Button>
  </div>
));
EmptyCart.displayName = "EmptyCart";

// Memoized Order Summary Component
const OrderSummary = memo(({ 
  totalPrice, 
  adjustedTotalPrice, 
  name, 
  phone, 
  address, 
  onNameChange, 
  onPhoneChange, 
  onAddressChange, 
  onPayment 
}: any) => {
  const discount = useMemo(() => {
    if (totalPrice === 0) return 0;
    return Math.round(((totalPrice - adjustedTotalPrice) / totalPrice) * 100);
  }, [totalPrice, adjustedTotalPrice]);

  const discountAmount = useMemo(() => {
    return Math.round(totalPrice - adjustedTotalPrice);
  }, [totalPrice, adjustedTotalPrice]);

  return (
    <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
      <h6 className="text-xl md:text-2xl font-bold text-black">Order Summary</h6>

      {/* User Details */}
      <div className="flex flex-col space-y-3 mb-5">
        <InputGroup>
          <InputGroup.Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={onNameChange}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={onPhoneChange}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={onAddressChange}
          />
        </InputGroup>
      </div>

      {/* Pricing */}
      <div className="flex flex-col space-y-2 mb-5">
        <div className="flex items-center justify-between">
          <span className="md:text-xl text-black/60">Subtotal</span>
          <span className="md:text-xl font-bold">₹{totalPrice}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="md:text-xl text-black/60">
              Discount (-{discount}%)
            </span>
            <span className="md:text-xl font-bold text-red-600">
              -₹{discountAmount}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="md:text-xl text-black/60">Delivery Fee</span>
          <span className="md:text-xl font-bold">Free</span>
        </div>
        <hr className="border-t-black/10" />
        <div className="flex items-center justify-between">
          <span className="md:text-xl text-black">Total</span>
          <span className="text-xl md:text-2xl font-bold">
            ₹{Math.round(adjustedTotalPrice)}
          </span>
        </div>
      </div>

      <Button
        type="button"
        className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4"
        onClick={onPayment}
      >
        Pay Now
      </Button>
    </div>
  );
});
OrderSummary.displayName = "OrderSummary";

export default function CartPage() {
  // Optimize Redux selectors with shallow equality
  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice ?? 0);
  const adjustedTotalPrice = useAppSelector((state: RootState) => state.carts.adjustedTotalPrice ?? 0);
  
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Memoize cart items
  const items = useMemo(() => cart?.items ?? [], [cart?.items]);

  // Load Razorpay script only once
  useEffect(() => {
    // Check if Razorpay is already loaded
    if (typeof Razorpay !== 'undefined') {
      setRazorpayLoaded(true);
      return;
    }

    // Check if script is already in DOM
    if (document.querySelector("#razorpay-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Memoize event handlers
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }, []);

  const handlePayment = useCallback(() => {
    if (!name || !phone || !address) {
      alert("Please fill all your details before proceeding.");
      return;
    }

    if (!razorpayLoaded || typeof Razorpay === 'undefined') {
      alert("Payment gateway is loading. Please try again.");
      return;
    }

    // Create a snapshot of current items
    const currentItems = items.map(item => ({ ...item }));

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(adjustedTotalPrice) * 100,
      currency: "INR",
      name: "Book Store", // Changed from Candle Store
      description: "Purchase Books",
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
          const whatsappNumber = "7777909218";
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
  }, [name, phone, address, items, adjustedTotalPrice, dispatch, razorpayLoaded]);

  // Early return for empty cart
  if (items.length === 0) {
    return (
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
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
            {items.map((product, idx) => (
              <React.Fragment key={product.id || idx}>
                <ProductCard data={product} />
                {idx < items.length - 1 && <hr className="border-t-black/10" />}
              </React.Fragment>
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary
            totalPrice={totalPrice}
            adjustedTotalPrice={adjustedTotalPrice}
            name={name}
            phone={phone}
            address={address}
            onNameChange={handleNameChange}
            onPhoneChange={handlePhoneChange}
            onAddressChange={handleAddressChange}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </main>
  );
}