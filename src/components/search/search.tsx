'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [minRating, setMinRating] = useState<number>(0);

  // Categories
  const categories = [
    'All Categories',
    'IT & Programming',
    'Artificial Intelligence',
    'Web Development',
    'Data Science',
    'Cyber Security',
    'Cloud Computing',
    'Mobile Development',
    'DevOps',
    'Machine Learning',
  ];

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search or filters change
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, priceRange, sortBy, minRating, products]);

  // Update URL with search query
  useEffect(() => {
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
    }
  }, [searchQuery, router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const title = product.title?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        const category = product.category?.toLowerCase() || '';
        const author = product.author?.toLowerCase() || '';
        
        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query) ||
          author.includes(query)
        );
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((product) => {
        const rating = product.rating || 0;
        return rating >= minRating;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'name-desc':
        filtered.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Relevance - keep as is
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 10000]);
    setSortBy('relevance');
    setMinRating(0);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 10000) count++;
    if (minRating > 0) count++;
    if (sortBy !== 'relevance') count++;
    return count;
  }, [selectedCategory, priceRange, minRating, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className={cn([
                integralCF.className,
                'text-3xl md:text-4xl lg:text-5xl text-black uppercase mb-6 text-center',
              ])}
            >
              Search Candles
            </h1>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto relative">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by book name, author, category..."
                  className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-black focus:outline-none text-base md:text-lg transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <span>
                  {loading ? (
                    'Searching...'
                  ) : (
                    <>
                      <strong className="text-black">{filteredProducts.length}</strong> Candles found
                      {searchQuery && ` for "${searchQuery}"`}
                    </>
                  )}
                </span>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-72 flex-shrink-0 hidden lg:block"
            >
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {categories.map((category, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={
                            category === 'All Categories'
                              ? selectedCategory === 'all'
                              : selectedCategory === category
                          }
                          onChange={() =>
                            setSelectedCategory(
                              category === 'All Categories' ? 'all' : category
                            )
                          }
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>₹{priceRange[0]}</span>
                      <span>-</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-black"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                        }
                        placeholder="Min"
                        className="px-3 py-2 border rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])
                        }
                        placeholder="Max"
                        className="px-3 py-2 border rounded text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">
                          {rating === 0 ? 'All Ratings' : `${rating}★ & above`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </motion.aside>

            {/* Mobile Filters Sheet */}
            <AnimatePresence>
              {showFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilters(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  />
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween' }}
                    className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6 lg:hidden"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-gray-600 hover:text-black underline w-full text-left"
                        >
                          Clear all filters
                        </button>
                      )}

                      {/* Category */}
                      <div className="border-b pb-6">
                        <h4 className="font-semibold mb-3">Category</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {categories.map((category, index) => (
                            <label
                              key={index}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="category-mobile"
                                checked={
                                  category === 'All Categories'
                                    ? selectedCategory === 'all'
                                    : selectedCategory === category
                                }
                                onChange={() =>
                                  setSelectedCategory(
                                    category === 'All Categories' ? 'all' : category
                                  )
                                }
                                className="w-4 h-4 accent-black"
                              />
                              <span className="text-sm">{category}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="border-b pb-6">
                        <h4 className="font-semibold mb-3">Price Range</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <span>₹{priceRange[0]}</span>
                            <span>-</span>
                            <span>₹{priceRange[1]}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], parseInt(e.target.value)])
                            }
                            className="w-full accent-black"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) =>
                                setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                              }
                              placeholder="Min"
                              className="px-3 py-2 border rounded text-sm focus:outline-none focus:border-black"
                            />
                            <input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])
                              }
                              placeholder="Max"
                              className="px-3 py-2 border rounded text-sm focus:outline-none focus:border-black"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="border-b pb-6">
                        <h4 className="font-semibold mb-3">Minimum Rating</h4>
                        <div className="space-y-2">
                          {[4, 3, 2, 1, 0].map((rating) => (
                            <label
                              key={rating}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="rating-mobile"
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="w-4 h-4 accent-black"
                              />
                              <span className="text-sm">
                                {rating === 0 ? 'All Ratings' : `${rating}★ & above`}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Sort */}
                      <div>
                        <h4 className="font-semibold mb-3">Sort By</h4>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                        >
                          <option value="relevance">Relevance</option>
                          <option value="newest">Newest First</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="name-asc">Name: A to Z</option>
                          <option value="name-desc">Name: Z to A</option>
                          <option value="rating">Highest Rated</option>
                        </select>
                      </div>

                      <Button
                        onClick={() => setShowFilters(false)}
                        className="w-full rounded-full"
                      >
                        Show {filteredProducts.length} Results
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                // Loading Skeleton
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                // Empty State
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🕯️</div>
                  <h3 className="text-2xl font-bold mb-2">No Candles found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try different keywords.`
                      : 'Try adjusting your filters'}
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    {searchQuery && (
                      <Button 
                        onClick={() => setSearchQuery('')} 
                        variant="outline" 
                        className="rounded-full"
                      >
                        Clear Search
                      </Button>
                    )}
                    {activeFiltersCount > 0 && (
                      <Button 
                        onClick={clearFilters} 
                        variant="outline"
                        className="rounded-full"
                      >
                        Clear Filters
                      </Button>
                    )}
                    <Button asChild className="rounded-full">
                      <Link href="/shop">Browse All Candles</Link>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                // Products Grid
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  {filteredProducts.map((product, index) => (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;