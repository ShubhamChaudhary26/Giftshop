"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState, useEffect, useMemo, useCallback, memo, useTransition } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/store/cartsSlice";
import { useRouter } from "next/navigation";
// ❌ REMOVED: import { toast } from "sonner";

declare let Razorpay: any;

// ✅ Type for Order Summary Props
interface OrderSummaryProps {
  totalPrice: number;
  adjustedTotalPrice: number;
  name: string;
  phone: string;
  address: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPayment: () => void;
  isPending: boolean;
}

// Memoized Empty Cart Component
const EmptyCart = memo(() => (
  <div className="flex items-center flex-col text-gray-300 mt-32">
    <TbBasketExclamation strokeWidth={1} className="text-6xl md:text-7xl" />
    <span className="block mb-4 text-lg md:text-xl">Your shopping cart is empty.</span>
    <Button className="rounded-full px-8 py-2 md:px-10 md:py-3" asChild>
      <Link href="/shop">Start Shopping</Link>
    </Button>
  </div>
));
EmptyCart.displayName = "EmptyCart";

// Memoized Order Summary Component
const OrderSummary = memo<OrderSummaryProps>(({ 
  totalPrice, 
  adjustedTotalPrice, 
  name, 
  phone, 
  address, 
  onNameChange, 
  onPhoneChange, 
  onAddressChange, 
  onPayment,
  isPending
}) => {
  const discount = useMemo(() => {
    if (totalPrice === 0) return 0;
    return Math.round(((totalPrice - adjustedTotalPrice) / totalPrice) * 100);
  }, [totalPrice, adjustedTotalPrice]);

  const discountAmount = useMemo(() => {
    return Math.round(totalPrice - adjustedTotalPrice);
  }, [totalPrice, adjustedTotalPrice]);

  // ✅ Form validation
  const isFormValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      phone.trim().length >= 10 &&
      address.trim().length >= 10
    );
  }, [name, phone, address]);

  return (
    <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10 sticky top-24 bg-white">
      <h6 className="text-xl md:text-2xl font-bold text-black">Order Summary</h6>

      {/* User Details */}
      <div className="flex flex-col space-y-3">
        <InputGroup>
          <InputGroup.Input
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={onNameChange}
            disabled={isPending}
            required
            minLength={2}
            className={cn([
              "transition-all",
              name && name.length < 2 && "border-red-300 focus:border-red-500"
            ])}
          />
        </InputGroup>
        
        <InputGroup>
          <InputGroup.Input
            type="tel"
            placeholder="Phone Number (10 digits) *"
            value={phone}
            onChange={onPhoneChange}
            disabled={isPending}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            className={cn([
              "transition-all",
              phone && phone.length < 10 && "border-red-300 focus:border-red-500"
            ])}
          />
        </InputGroup>
        
        <InputGroup>
          <InputGroup.Input
            type="text"
            placeholder="Full Address *"
            value={address}
            onChange={onAddressChange}
            disabled={isPending}
            required
            minLength={10}
            className={cn([
              "transition-all",
              address && address.length < 10 && "border-red-300 focus:border-red-500"
            ])}
          />
        </InputGroup>
      </div>

      {/* Pricing */}
      <div className="flex flex-col space-y-2 border-t border-b border-black/10 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base md:text-xl text-black/60">Subtotal</span>
          <span className="text-base md:text-xl font-bold">
            ₹{totalPrice.toLocaleString('en-IN')}
          </span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-base md:text-xl text-black/60">
              Discount (-{discount}%)
            </span>
            <span className="text-base md:text-xl font-bold text-red-600">
              -₹{discountAmount.toLocaleString('en-IN')}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-base md:text-xl text-black/60">Delivery Fee</span>
          <span className="text-base md:text-xl font-bold text-green-600">Free</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-2">
        <span className="text-lg md:text-xl text-black font-semibold">Total</span>
        <span className="text-xl md:text-2xl font-bold text-black">
          ₹{Math.round(adjustedTotalPrice).toLocaleString('en-IN')}
        </span>
      </div>

      {/* Pay Button */}
      <Button
        type="button"
        className={cn([
          "text-sm md:text-base font-medium bg-black rounded-full w-full py-4 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-gray-800 transition-all duration-300"
        ])}
        onClick={onPayment}
        disabled={isPending || !isFormValid}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          "Proceed to Payment"
        )}
      </Button>

      {/* Helper Text */}
      {!isFormValid && (
        <p className="text-xs text-red-500 text-center">
          Please fill all fields correctly before proceeding
        </p>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secure Payment with Razorpay</span>
      </div>
    </div>
  );
});
OrderSummary.displayName = "OrderSummary";

export default function CartPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  // Redux selectors
  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice ?? 0);
  const adjustedTotalPrice = useAppSelector((state: RootState) => state.carts.adjustedTotalPrice ?? 0);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Memoize cart items
  const items = useMemo(() => cart?.items ?? [], [cart?.items]);

  // Load Razorpay script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (typeof Razorpay !== 'undefined') {
      setRazorpayLoaded(true);
      return;
    }

    const existingScript = document.querySelector("#razorpay-script") as HTMLScriptElement;
    if (existingScript) {
      if (existingScript.getAttribute('data-loaded') === 'true') {
        setRazorpayLoaded(true);
      } else {
        existingScript.addEventListener('load', () => {
          setRazorpayLoaded(true);
          existingScript.setAttribute('data-loaded', 'true');
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
      script.setAttribute('data-loaded', 'true');
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay");
      alert("Payment gateway failed to load. Please refresh the page.");
    };
    document.head.appendChild(script);
  }, []);

  // Event handlers
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 10) {
      setPhone(value);
    }
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }, []);

  // Payment handler
  const handlePayment = useCallback(() => {
    // Validation
    if (!name || name.length < 2) {
      alert("Please enter a valid name (minimum 2 characters)");
      return;
    }

    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (!address || address.length < 10) {
      alert("Please enter a complete address (minimum 10 characters)");
      return;
    }

    if (!razorpayLoaded || typeof Razorpay === 'undefined') {
      alert("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    startTransition(() => {
      const currentItems = items.map(item => ({ ...item }));

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(adjustedTotalPrice) * 100,
        currency: "INR",
        name: "Book.Verse",
        description: "Purchase Books",
        image: "/logo.png", // Add your logo
        handler: (response: any) => {
          try {
            // Prepare order details
            const productsList = currentItems
              .map((p) => `- ${p.name} x ${p.quantity} = ₹${(p.price * p.quantity).toLocaleString('en-IN')}`)
              .join("\n");

            const message = `🎉 *New Order Received!*\n\n` +
              `👤 *Customer Details:*\n` +
              `Name: ${name}\n` +
              `Phone: ${phone}\n` +
              `Address: ${address}\n\n` +
              `💰 *Payment Details:*\n` +
              `Total Paid: ₹${Math.round(adjustedTotalPrice).toLocaleString('en-IN')}\n` +
              `Payment ID: ${response.razorpay_payment_id}\n\n` +
              `📚 *Products:*\n${productsList}\n\n` +
              `Thank you for your order! 🙏`;

            // Clear cart
            dispatch(clearCart());

            // Reset form
            setName("");
            setPhone("");
            setAddress("");

            // Success notification
            alert("Payment successful! Redirecting to WhatsApp...");

            // Open WhatsApp
            requestAnimationFrame(() => {
              const whatsappNumber = "7777909218";
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
              
              // Redirect after short delay
              setTimeout(() => {
                router.push("/shop?success=true");
              }, 1000);
            });
          } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment successful but there was an error. Please contact support.");
          }
        },
        prefill: {
          name,
          contact: phone,
          email: "", // Optional: add email field
        },
        notes: {
          address: address,
          order_type: "Book Purchase",
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
          },
          escape: true,
          animation: true,
        },
      };

      try {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          alert(`Payment Failed: ${response.error.description}`);
          console.error('Payment failed:', response.error);
        });
        rzp.open();
      } catch (error) {
        console.error("Error opening Razorpay:", error);
        alert("Failed to open payment gateway. Please try again.");
      }
    });
  }, [name, phone, address, items, adjustedTotalPrice, dispatch, razorpayLoaded, router]);

  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="pb-20 min-h-screen">
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
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h2
            className={cn([
              integralCF.className,
              "font-bold text-2xl md:text-[32px] lg:text-[40px] text-black uppercase",
            ])}
          >
            Your Cart
          </h2>
          <span className="text-sm md:text-base text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          {/* Cart Items */}
          <div className="w-full lg:flex-1 p-3.5 md:px-6 md:py-5 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
            {items.map((product, idx) => (
              <React.Fragment key={`${product.id}-${product.attributes.join('-')}-${idx}`}>
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
            isPending={isPending}
          />
        </div>
      </div>
    </main>
  );
}