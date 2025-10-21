// app/cart/page.tsx
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
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

declare let Razorpay: any;

// Type for Order Summary Props
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
            className={cn(["transition-all", name && name.length < 2 && "border-red-300 focus:border-red-500"])}
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
            className={cn(["transition-all", phone && phone.length < 10 && "border-red-300 focus:border-red-500"])}
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
            className={cn(["transition-all", address && address.length < 10 && "border-red-300 focus:border-red-500"])}
          />
        </InputGroup>
      </div>

      <div className="flex flex-col space-y-2 border-t border-b border-black/10 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base md:text-xl text-black/60">Subtotal</span>
          <span className="text-base md:text-xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-base md:text-xl text-black/60">Discount (-{discount}%)</span>
            <span className="text-base md:text-xl font-bold text-red-600">-₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-base md:text-xl text-black/60">Delivery Fee</span>
          <span className="text-base md:text-xl font-bold text-green-600">Free</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-lg md:text-xl text-black font-semibold">Total</span>
        <span className="text-xl md:text-2xl font-bold text-black">₹{Math.round(adjustedTotalPrice).toLocaleString('en-IN')}</span>
      </div>

      <Button
        type="button"
        className={cn("text-sm md:text-base font-medium bg-black rounded-full w-full py-4 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed", "hover:bg-gray-800 transition-all duration-300")}
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
        ) : "Proceed to Payment"}
      </Button>

      {!isFormValid && (
        <p className="text-xs text-red-500 text-center">Please fill all fields correctly before proceeding</p>
      )}

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

  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice ?? 0);
  const adjustedTotalPrice = useAppSelector((state: RootState) => state.carts.adjustedTotalPrice ?? 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const items = useMemo(() => cart?.items ?? [], [cart?.items]);

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

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) setPhone(value);
  }, []);
  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value), []);

  const handlePayment = useCallback(() => {
    if (!name || name.length < 2) { alert("Please enter a valid name"); return; }
    if (!phone || phone.length !== 10) { alert("Please enter a 10-digit phone number"); return; }
    if (!address || address.length < 10) { alert("Please enter a complete address"); return; }
    if (!razorpayLoaded || typeof Razorpay === 'undefined') { alert("Payment gateway is loading. Please wait."); return; }
    if (items.length === 0) { alert("Your cart is empty!"); return; }

    startTransition(() => {
      const currentItems = items.map(item => ({ ...item }));

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(adjustedTotalPrice) * 100,
        currency: "INR",
        name: "Candle.Store",
        description: "Purchase Candles",
        handler: (response: any) => {
          const productsList = currentItems.map(p => `- ${p.name} x ${p.quantity}`).join("\n");
          const message = `🎉 *New Order Received!*\n\n👤 *Customer:*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n💰 *Payment:*\nTotal: ₹${Math.round(adjustedTotalPrice).toLocaleString('en-IN')}\nID: ${response.razorpay_payment_id}\n\n🕯️ *Products:*\n${productsList}\n\nThank you! 🙏`;
          const finalWhatsappUrl = `https://wa.me/7777909218?text=${encodeURIComponent(message)}`;
          
          setWhatsappUrl(finalWhatsappUrl);
          setPaymentSuccess(true);
          
          dispatch(clearCart());
          setName("");
          setPhone("");
          setAddress("");
        },
        prefill: { name, contact: phone },
        notes: { address, order_type: "Candle Purchase" },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => console.log("Payment cancelled by user"),
        },
      };

      try {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', (resp: any) => alert(`Payment Failed: ${resp.error.description}`));
        rzp.open();
      } catch (error) {
        alert("Failed to open payment gateway.");
      }
    });
  }, [name, phone, address, items, adjustedTotalPrice, dispatch, razorpayLoaded, router]);

  if (paymentSuccess) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-lg w-full mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h2 className={cn([integralCF.className, "text-3xl font-bold mb-3"])}>
              Payment Successful
            </h2>
            
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your payment and your order is now being processed.
            </p>
            
            <div className="space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block px-8 py-4 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors text-lg"
              >
                Confirm Order on WhatsApp
              </a>
              {/* <Button 
                variant="outline"
                className="w-full rounded-full py-4"
                onClick={() => router.push('/shop')}
              >
                Continue Shopping
              </Button> */}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

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
        
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h2 className={cn([integralCF.className, "font-bold text-2xl md:text-[32px] lg:text-[40px] text-black uppercase"])}>
            Your Cart
          </h2>
          <span className="text-sm md:text-base text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          <div className="w-full lg:flex-1 p-3.5 md:px-6 md:py-5 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
            {items.map((product, idx) => (
              <React.Fragment key={`${product.id}-${product.attributes.join('-')}-${idx}`}>
                <ProductCard data={product} />
                {idx < items.length - 1 && <hr className="border-t-black/10" />}
              </React.Fragment>
            ))}
          </div>

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