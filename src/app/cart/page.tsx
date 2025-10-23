"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState, useMemo, useCallback, memo, useTransition } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface OrderSummaryProps {
  totalPrice: number;
  adjustedTotalPrice: number;
  name: string;
  phone: string;
  address: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceOrder: () => void;
  isPending: boolean;
}

const EmptyCart = memo(() => (
  <div className="flex items-center flex-col text-purple-300 mt-20 sm:mt-32">
    <TbBasketExclamation strokeWidth={1} className="text-6xl md:text-8xl mb-4" />
    <span className="block mb-6 text-lg md:text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
      Your shopping cart is empty
    </span>
    <Link href="/shop" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-8 py-3 rounded-full hover:shadow-gift-lg transition-shadow">
      Start Shopping
    </Link>
  </div>
));
EmptyCart.displayName = "EmptyCart";

const OrderSummary = memo<OrderSummaryProps>(({ 
  totalPrice, adjustedTotalPrice, name, phone, address, 
  onNameChange, onPhoneChange, onAddressChange, onPlaceOrder, isPending 
}) => {
  const discount = useMemo(() => Math.round(((totalPrice - adjustedTotalPrice) / totalPrice) * 100), [totalPrice, adjustedTotalPrice]);
  const discountAmount = useMemo(() => Math.round(totalPrice - adjustedTotalPrice), [totalPrice, adjustedTotalPrice]);
  const isFormValid = useMemo(() => name.trim().length >= 2 && phone.trim().length >= 10 && address.trim().length >= 10, [name, phone, address]);

  return (
    <div className="w-full lg:max-w-[450px] p-5 md:p-6 flex-col space-y-4 rounded-2xl border-2 border-pink-200 sticky top-24 bg-white/90 backdrop-blur-lg shadow-lg">
      <h6 className={cn(integralCF.className, "text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent")}>
        Order Summary
      </h6>

      <div className="flex flex-col space-y-4">
        <InputGroup>
          <InputGroup.Input type="text" placeholder="Your Name *" value={name} onChange={onNameChange} disabled={isPending} required minLength={2} className="border-pink-200 focus:border-purple-400 bg-white/80" />
        </InputGroup>
        <InputGroup>
          <InputGroup.Input type="tel" placeholder="Phone Number (10 digits) *" value={phone} onChange={onPhoneChange} disabled={isPending} required pattern="[0-9]{10}" maxLength={10} className="border-pink-200 focus:border-purple-400 bg-white/80" />
        </InputGroup>
        <InputGroup>
          <InputGroup.Input type="text" placeholder="Full Address *" value={address} onChange={onAddressChange} disabled={isPending} required minLength={10} className="border-pink-200 focus:border-purple-400 bg-white/80" />
        </InputGroup>
      </div>

      <div className="flex flex-col space-y-2 border-t-2 border-b-2 border-pink-100 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base text-purple-800">Subtotal</span>
          <span className="text-base font-bold text-gray-800">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-base text-purple-800">Discount (-{discount}%)</span>
            <span className="text-base font-bold text-green-600">-₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-base text-purple-800">Delivery Fee</span>
          <span className="text-base font-bold text-green-600">Free</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Total</span>
        <span className="text-xl md:text-2xl font-bold text-gray-800">₹{Math.round(adjustedTotalPrice).toLocaleString('en-IN')}</span>
      </div>

      <button
        type="button"
        className={cn("text-sm md:text-base font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full w-full py-3.5 md:py-4 disabled:opacity-60 disabled:cursor-not-allowed", "hover:shadow-gift-lg transition-all duration-300")}
        onClick={onPlaceOrder}
        disabled={isPending || !isFormValid}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <FaWhatsapp size={20} />
            Order on WhatsApp
          </span>
        )}
      </button>

      {!isFormValid && (
        <p className="text-xs text-red-500 text-center">Please fill all fields correctly to place order</p>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>Cash on Delivery Available</span>
      </div>
    </div>
  );
});
OrderSummary.displayName = "OrderSummary";

export default function CartPage() {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice ?? 0);
  const adjustedTotalPrice = useAppSelector((state: RootState) => state.carts.adjustedTotalPrice ?? 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const items = useMemo(() => cart?.items ?? [], [cart?.items]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) setPhone(value);
  }, []);
  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value), []);

  const handleOrderOnWhatsApp = useCallback(() => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill all your details.");
      return;
    }

    startTransition(() => {
      const productsList = items.map(p => `• ${p.name} (Qty: ${p.quantity}) - ₹${p.price.toLocaleString('en-IN')}`).join("\n");
      const message = `🎉 *New Order via Website!*\n\n*Customer Details:*\nName: *${name}*\nPhone: *${phone}*\nAddress: *${address}*\n\n*Order Summary:*\n${productsList}\n\n*Total Amount:* ₹${Math.round(adjustedTotalPrice).toLocaleString('en-IN')}\n\n_Please confirm this order._`;
      const finalWhatsappUrl = `https://wa.me/917777909218?text=${encodeURIComponent(message)}`;
      
      setWhatsappUrl(finalWhatsappUrl);
      setOrderPlaced(true);
      
      dispatch(clearCart());
      // Optionally open WhatsApp link automatically
      // window.open(finalWhatsappUrl, '_blank');
    });
  }, [name, phone, address, items, adjustedTotalPrice, dispatch]);

  if (orderPlaced) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className="bg-white rounded-3xl p-8 text-center shadow-gift-lg max-w-lg w-full mx-auto border-2 border-pink-100"
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h2 className={cn([integralCF.className, "text-3xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"])}>
              Almost There!
            </h2>
            
            <p className="text-purple-800 mb-8">
              Your order is ready. Please confirm it on WhatsApp to complete the process.
            </p>
            
            <div className="space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#128C7E] transition-colors text-lg"
              >
                <FaWhatsapp size={24} />
                Confirm on WhatsApp
              </a>
              <Link
                href="/shop"
                className="w-full inline-block font-bold text-purple-600 hover:text-pink-600 transition-colors py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pb-20 min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <BreadcrumbCart />
        
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h2 className={cn([integralCF.className, "font-bold text-2xl md:text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent uppercase"])}>
            Your Cart
          </h2>
          <span className="text-sm md:text-base font-semibold text-purple-800">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:flex-1 p-4 md:p-6 flex-col space-y-4 md:space-y-6 rounded-2xl border-2 border-pink-100 bg-white/90 backdrop-blur-lg shadow-md">
            {items.map((product, idx) => (
              <React.Fragment key={`${product.id}-${product.attributes.join('-')}-${idx}`}>
                <ProductCard data={product} />
                {idx < items.length - 1 && <hr className="border-t-pink-200" />}
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
            onPlaceOrder={handleOrderOnWhatsApp}
            isPending={isPending}
          />
        </div>
      </div>
    </main>
  );
}