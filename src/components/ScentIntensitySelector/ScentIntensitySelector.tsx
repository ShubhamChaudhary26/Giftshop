// components/GiftBoxBuilder.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Plus, Trash2, Package, Sparkles, ShoppingCart, AlertCircle, CheckCircle, Gift } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  author?: string;
  description?: string;
  price: number;
  discount_amount: number;
  discount_percentage: number;
  rating: number;
  src_url: string;
  category?: string;
  stock: number;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_top_selling?: boolean;
  created_at?: string;
  updated_at?: string;
  gallery?: string[];
}

export default function GiftBoxBuilder() {
  const [availableCandles, setAvailableCandles] = useState<Product[]>([]);
  const [selectedCandles, setSelectedCandles] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    async function fetchCandles() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .limit(4)
          .order("rating", { ascending: false });

        if (!error && data) {
          setAvailableCandles(data as Product[]);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCandles();
  }, []);

  const addCandle = (candle: Product) => {
    const giftBoxElement = document.getElementById("gift-box-preview");
    if (giftBoxElement) {
      giftBoxElement.classList.add("animate-pulse-once");
      setTimeout(() => {
        giftBoxElement.classList.remove("animate-pulse-once");
      }, 500);
    }
    
    if (selectedCandles.length < 4) {
      setSelectedCandles([...selectedCandles, candle]);
      setNotification({
        message: `Added: ${candle.title}`,
        type: 'success'
      });
    } else {
      setNotification({
        message: "Gift Box is Full",
        type: 'error'
      });
    }
  };

  const removeCandle = (index: number) => {
    setSelectedCandles(selectedCandles.filter((_, i) => i !== index));
  };

  const calculateFinalPrice = (product: Product): number => {
    if (product.discount_percentage > 0) {
      return Math.round(product.price - (product.price * product.discount_percentage) / 100);
    }
    if (product.discount_amount > 0) {
      return product.price - product.discount_amount;
    }
    return product.price;
  };

  const totalPrice = selectedCandles.reduce((sum, candle) => sum + calculateFinalPrice(candle), 0);
  const boxPrice = selectedCandles.length >= 3 ? 149 : 0;
  const discount = selectedCandles.length >= 3 ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice + boxPrice - discount;

  const handleCheckout = () => {
    if (selectedCandles.length === 0) {
      setNotification({ message: "Gift Box is Empty", type: 'error' });
      return;
    }

    try {
      setIsCheckingOut(true);
      
      selectedCandles.forEach((candle) => {
        const cartItem = {
          id: candle.id,
          name: candle.title,
          price: calculateFinalPrice(candle),
          srcUrl: candle.src_url || "/placeholder.png",
          quantity: 1,
          attributes: ["Gift Box"],
          discount: {
            percentage: candle.discount_percentage || 0,
            amount: candle.discount_amount || 0,
          },
        };
        dispatch(addToCart(cartItem));
      });

      setTimeout(() => {
        router.push("/cart");
      }, 2500);

    } catch (error) {
      setIsCheckingOut(false);
      alert("Something Went Wrong: Please try again or contact support.");
    }
  };

  if (loading) {
    return (
      <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 sm:h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded w-48 sm:w-64 mx-auto mb-4"></div>
            <div className="h-4 sm:h-6 bg-gradient-to-r from-purple-200 to-blue-200 rounded w-64 sm:w-96 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
              <div className="h-[400px] sm:h-[500px] bg-white/80 rounded-2xl sm:rounded-3xl"></div>
              <div className="h-[400px] sm:h-[500px] bg-white/80 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 lg:py-10 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-x-hidden">
      
      {/* ✅ Checkout Success Overlay */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="bg-white rounded-3xl p-8 text-center shadow-gift-lg max-w-sm w-full mx-4 border-2 border-pink-200"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                className="inline-block"
              >
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full">
                  <Gift className="w-20 h-20 text-white mb-4" />
                </div>
              </motion.div>
              <h3 className={cn([integralCF.className, "text-2xl font-bold mb-2 gradient-text"])}>
                Gift Box Added!
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedCandles.length >= 3 
                  ? "🎉 You saved 10% on your custom box!"
                  : "✨ Your gifts have been added!"
                }
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 shadow-gift-lg rounded-full py-3 px-5 text-sm font-semibold backdrop-blur-sm",
              notification.type === 'success' 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
            )}
          >
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4">
        
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full mb-4 text-sm font-bold uppercase tracking-wider shadow-lg"
          >
            <Package className="w-4 h-4" />
            Create Custom Box
          </motion.div> */}
          
          <h2
            className={cn([
              integralCF.className,
              "text-2xl sm:text-[32px] md:text-5xl lg:text-6xl mb-2 sm:mb-4 capitalize font-bold leading-tight gradient-text",
            ])}
          >
            Build Your Gift Box
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm md:text-lg lg:text-xl px-4">
            Choose 3+ products and get <span className="font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">10% off</span> + Free premium box
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left: Gift Box Preview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-pink-200 lg:sticky lg:top-4 h-fit shadow-gift-lg">
            
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className={cn([integralCF.className, "text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"])}>
                Your Gift Box
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {selectedCandles.length >= 3 && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center gap-1 shadow-md"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>10% OFF</span>
                  </motion.span>
                )}
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedCandles.length}/4
                </span>
              </div>
            </div>

            <div 
              id="gift-box-preview" 
              className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 md:p-6 mb-6 min-h-[350px] md:min-h-[400px] border-2 border-dashed border-pink-300 transition-all duration-300"
            >
              {selectedCandles.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 px-4">
                  <div className="bg-white/80 p-6 rounded-2xl">
                    <Package className="w-16 h-16 mb-4 mx-auto text-pink-400" />
                    <p className="text-sm font-medium text-center text-gray-600">Start adding products</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <AnimatePresence>
                    {selectedCandles.map((candle, index) => (
                      <motion.div 
                        key={`${candle.id}-${index}`} 
                        layout 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }} 
                        transition={{ duration: 0.3 }} 
                        className="relative bg-white rounded-xl p-3 border-2 border-pink-200 group hover:border-purple-400 transition-all shadow-md hover:shadow-gift"
                      >
                        <button 
                          onClick={() => removeCandle(index)} 
                          className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="relative w-full aspect-square mb-2 bg-gradient-to-br from-pink-50 to-purple-50 rounded-md overflow-hidden">
                          <Image src={candle.src_url || "/placeholder.png"} alt={candle.title} fill className="object-contain" />
                        </div>
                        <p className="text-xs font-bold text-center line-clamp-1 text-gray-800">{candle.title}</p>
                        <p className="text-xs text-center font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{calculateFinalPrice(candle)}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {[...Array(Math.max(0, 4 - selectedCandles.length))].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square rounded-xl border-2 border-dashed border-pink-200 flex items-center justify-center bg-white/50">
                      <Plus className="w-8 h-8 text-pink-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Products ({selectedCandles.length})</span>
                <span className="font-bold text-gray-800">₹{totalPrice}</span>
              </div>
              {selectedCandles.length >= 3 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Premium Box</span>
                    <span className="font-bold text-gray-800">₹{boxPrice}</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex justify-between text-sm"
                  >
                    <span className="flex items-center gap-1 font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      Bundle Discount (10%)
                    </span>
                    <span className="font-bold text-green-600">-₹{discount.toFixed(0)}</span>
                  </motion.div>
                </>
              )}
              <div className="h-px bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200" />
              <div className="flex justify-between">
                <span className={cn([integralCF.className, "font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"])}>
                  Total
                </span>
                <span className={cn([integralCF.className, "font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"])}>
                  ₹{finalPrice.toFixed(0)}
                </span>
              </div>
              {selectedCandles.length > 0 && selectedCandles.length < 3 && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-xs text-center py-2 px-3 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-lg font-semibold text-amber-700"
                >
                  Add {3 - selectedCandles.length} more to get 10% off! 🎁
                </motion.p>
              )}
            </div>
            
            <button 
              onClick={handleCheckout} 
              disabled={selectedCandles.length === 0} 
              className={cn(
                "w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-base shadow-lg",
                selectedCandles.length > 0 
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-gift-lg active:scale-95" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>
                {selectedCandles.length === 0 ? "Add Products to Box" : `Add to Cart (₹${finalPrice.toFixed(0)})`}
              </span>
            </button>
          </div>

          {/* Right: Choose Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn([integralCF.className, "text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"])}>
                Choose Products
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {availableCandles.length} available
              </span>
            </div>
            {availableCandles.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-pink-200">
                <p className="text-gray-600">No products available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {availableCandles.map((candle, idx) => {
                  const isMaxed = selectedCandles.length >= 4;
                  const timesAdded = selectedCandles.filter(c => c.id === candle.id).length;
                  const finalCandlePrice = calculateFinalPrice(candle);
                  return (
                    <motion.div
                      key={candle.id}
                      className="relative bg-white/90 backdrop-blur-sm rounded-xl p-3 border-2 border-pink-200 group transition-all hover:border-purple-400 hover:shadow-gift"
                      whileHover={{ y: -3 }}
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: idx * 0.05 }}
                    >
                      {timesAdded > 0 && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                            {timesAdded}x
                          </span>
                        </div>
                      )}
                      <div className="relative w-full aspect-square mb-2 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg overflow-hidden">
                        <Image 
                          src={candle.src_url || "/placeholder.png"} 
                          alt={candle.title} 
                          fill 
                          className="object-contain group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <p className="text-xs font-bold text-center line-clamp-1 mb-1 text-gray-800">{candle.title}</p>
      
                      <p className="text-xs text-center font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{finalCandlePrice}
                      </p>
                      <button
                        onClick={() => addCandle(candle)}
                        disabled={isMaxed}
                        className={cn(
                          "w-full py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md",
                          isMaxed 
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                            : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-gift active:scale-95"
                        )}
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isMaxed ? "Full" : "Add"}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}