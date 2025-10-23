"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Filter, ChevronRight, Home } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export default function SubcategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const subcategorySlug = params.subcategory as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProducts();
  }, [categorySlug, subcategorySlug]);

  useEffect(() => {
    if (products.length > 0) {
      sortProducts();
    }
  }, [sortBy]);

  async function fetchProducts() {
    try {
      const { data: categoryData, error: catError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", categorySlug)
        .single();

      if (catError) throw catError;
      setCategory(categoryData);

      const { data: subcategoryData, error: subError } = await supabase
        .from("subcategories")
        .select("*")
        .eq("slug", subcategorySlug)
        .eq("category_id", categoryData.id)
        .single();

      if (subError) throw subError;
      setSubcategory(subcategoryData);

      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("*")
        .eq("subcategory_id", subcategoryData.id)
        .order("created_at", { ascending: false });

      if (prodError) throw prodError;

      const formattedProducts: Product[] = (productsData || []).map((item) => ({
        id: item.id,
        title: item.title || "",
        src_url: item.src_url,
        srcUrl: item.src_url,
        gallery: item.gallery || [item.src_url],
        price: item.price || 0,
        discount: {
          amount: item.discount_amount || 0,
          percentage: item.discount_percentage || 0,
        },
        discount_amount: item.discount_amount || 0,
        discount_percentage: item.discount_percentage || 0,
        rating: item.rating || 0,
        author: item.author,
        category_id: item.category_id,
        subcategory_id: item.subcategory_id,
        stock: item.stock,
        is_new_arrival: item.is_new_arrival,
        is_featured: item.is_featured,
        is_top_selling: item.is_top_selling,
        description: item.description,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getDiscountedPrice(product: Product): number {
    const price = product.price || 0;
    const discountPercent = product.discount_percentage || 0;

    if (discountPercent > 0) {
      return price - (price * discountPercent) / 100;
    }
    return price;
  }

  function sortProducts() {
    const sorted = [...products];

    switch (sortBy) {
      case "priceLow":
        sorted.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
        break;

      case "priceHigh":
        sorted.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
        break;

      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      case "name":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;

      case "newest":
      default:
        break;
    }

    setProducts(sorted);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold font-bold bg-rose-500 bg-clip-text text-transparent">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9fb]">
        <div className="text-center bg-white rounded-3xl p-12 shadow-gift-lg">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-2xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent mb-4">Page not found</p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-gift-lg transition-all font-bold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9fb]">
      {/* Header */}
      <div className="relative bg-rose-500 text-white overflow-hidden">
        {subcategory.image_url && (
          <div className="absolute inset-0 opacity-20">
            <Image src={subcategory.image_url} alt={subcategory.name} fill className="object-cover" priority />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
            <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-white/60" />
            <Link href="/shop" className="text-white/80 hover:text-white transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-white/60" />
            <Link href={`/shop/${categorySlug}`} className="text-white/80 hover:text-white transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-white/60" />
            <span className="text-white font-bold">{subcategory.name}</span>
          </nav>
          {/* Title Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {subcategory.image_url && (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-gift-lg border-2 border-white/30 flex-shrink-0 bg-white">
                <Image src={subcategory.image_url} alt={subcategory.name} width={80} height={80} className="object-cover w-full h-full" />
              </div>
            )}
            <div className="flex-1">
              <h1 className={cn([integralCF.className, "text-3xl md:text-5xl uppercase leading-tight"])}>
                {subcategory.name}
              </h1>
              {subcategory.description && (
                <p className="text-white/90 mt-2 text-sm md:text-base max-w-2xl">{subcategory.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80">{products.length} {products.length === 1 ? "Product" : "Products"}</span>
                </div>
                {products.filter((p) => p.is_new_arrival).length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">{products.filter((p) => p.is_new_arrival).length} New Arrivals</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Sort */}
      {products.length > 0 && (
        <div className="sticky top-[68px] sm:top-[72px] bg-white/95 backdrop-blur-lg border-b-2 border-pink-100 shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{products.length}</span> results
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="text-sm font-semibold font-bold bg-rose-500 bg-clip-text text-transparent whitespace-nowrap flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-initial px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-rose-500 transition min-w-[200px] bg-white text-gray-700 font-medium"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProductCard data={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent mb-4">No products available</p>
            <p className="text-gray-600 mb-6">We're adding new items to this collection soon. Check back later!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/shop/${categorySlug}`}
                className="inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-gift-lg transition-all font-bold"
              >
                Back to {category.name}
              </Link>
              <Link
                href="/shop"
                className="inline-block px-6 py-3 border-2 border-rose-500  rounded-full hover:bg-gradient-to-r hover:bg-rose-500 hover:text-white hover:border-transparent transition-all font-bold"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Product Stats */}
      {products.length > 3 && (
        <div className="bg-white/80 backdrop-blur-sm border-t-2 border-b-2 border-pink-100 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{products.length}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">Total Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{products.filter((p) => (p.stock ?? 0) > 0).length}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">In Stock</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{products.filter((p) => p.is_new_arrival).length}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">New Arrivals</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-bold bg-rose-500 bg-clip-text text-transparent">₹{Math.min(...products.map((p) => getDiscountedPrice(p))).toLocaleString("en-IN")}+</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">Starting Price</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/shop/${categorySlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-pink-200 text-pink-600 rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all text-sm font-semibold shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>More from {category.name}</span>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-purple-200  rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all text-sm font-semibold shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>All Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}