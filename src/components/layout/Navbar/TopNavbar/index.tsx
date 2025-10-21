'use client';

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { supabase } from "@/lib/supabase";

type NavMenuItem = {
  id: number;
  type: "MenuItem" | "MenuList";
  label: string;
  url: string;
  children: never[];
};

const data: NavMenuItem[] = [
  { id: 0, type: "MenuItem", label: "Home", url: "/", children: [] },
  { id: 3, type: "MenuItem", label: "Shop", url: "/shop", children: [] },
  { id: 1, type: "MenuItem", label: "About", url: "/about", children: [] },
  { id: 2, type: "MenuItem", label: "Services", url: "/service", children: [] },
  { id: 4, type: "MenuItem", label: "Contact", url: "/contact", children: [] },
];

const TopNavbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`title.ilike.%${query}%,author.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);

      if (error) throw error;
      
      console.log('Search results:', data);
      setSearchResults(data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  const getImageUrl = (product: any) => {
    // ✅ Fixed: Use src_url (snake_case) to match database
    return product.src_url || product.image_url || product.imageUrl || '';
  };

  const createSlug = (title: string) => {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'product';
  };

  return (
    <nav className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between max-w-frame mx-auto py-4 px-4 sm:px-6 lg:px-0">

        <div className="flex items-center gap-3">
          <div className="block md:hidden">
            <ResTopNavbar data={data} />
          </div>

          <Link
            href="/"
            className={cn(
              integralCF.className,
              "text-xl sm:text-2xl lg:text-[32px] font-bold mb-1.2 ml-2"
            )}
          >
            Candle.Store
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {data.map((item) => (
                <MenuItem key={item.id} label={item.label} url={item.url} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="flex-1 max-w-[350px] bg-[#F0F0F0] rounded-full">
                <InputGroup className="w-full">
                  <InputGroup.Text className="pl-4">
                    <Image
                      priority
                      src="/icons/search.svg"
                      height={20}
                      width={20}
                      alt="search"
                    />
                  </InputGroup.Text>
                  <InputGroup.Input
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    placeholder="Search for products..."
                    className="bg-transparent placeholder:text-black/40 w-full"
                    autoComplete="off"
                  />
                </InputGroup>
              </div>
            </form>

            {showResults && (
              <div className="absolute top-full mt-2 w-full min-w-[350px] max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full mb-2"></div>
                    <p className="text-gray-500 text-sm">Searching...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="text-5xl mb-3">📚</div>
                    <p className="text-gray-600">No results for "{searchQuery}"</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 border-b bg-gray-50 flex items-center justify-between sticky top-0 z-10">
                      <span className="text-sm font-semibold text-gray-700">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowResults(false)}
                        className="text-gray-500 hover:text-black w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="divide-y">
                      {searchResults.map((product) => {
                        const imageUrl = getImageUrl(product);
                        const productSlug = createSlug(product.title);
                        
                        return (
                          <Link
                            key={product.id}
                            href={`/shop/product/${product.id}/${productSlug}`}
                            onClick={handleProductClick}
                            className="flex gap-3 p-3 hover:bg-gray-50 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="w-16 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={product.title || 'Product'}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.style.display = 'none';
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-3xl">📚</div>';
                                    }
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                  📚
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm line-clamp-2 mb-1 leading-tight text-gray-900">
                                {product.title || 'Untitled'}
                              </h4>
                              {product.author && (
                                <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                                  by {product.author}
                                </p>
                              )}
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-black text-sm">
                                  ₹{product.price?.toLocaleString('en-IN') || '0'}
                                </p>
                                {product.rating && product.rating > 0 && (
                                  <span className="text-xs text-gray-600">
                                    ★ {product.rating.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setShowResults(false);
                        setSearchQuery('');
                      }}
                      className="w-full p-3 text-center bg-gray-50 hover:bg-gray-100 font-semibold text-black text-sm border-t transition-colors"
                    >
                      View All Results →
                    </button>
                  </>
                )}
              </div>
            )}

            {showResults && (
              <div
                className="fixed inset-0 bg-black/10 z-40"
                onClick={() => setShowResults(false)}
              />
            )}
          </div>

          <Link href="/search" className="block md:hidden p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={22}
              width={22}
              alt="search"
            />
          </Link>

          <CartBtn />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;