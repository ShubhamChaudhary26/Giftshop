'use client';
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ChevronLeft, ChevronRight, Heart } from "lucide-react";

type ProductListSecProps = {
  title: string;
  data: Product[];
  viewAllLink?: string;
  itemsPerPage?: number;
};

const ProductListSec = ({ title, data, viewAllLink, itemsPerPage = 20 }: ProductListSecProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };


  if (data.length === 0) {
    return (
      <section className="py-12 sm:py-16 max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center">
          <h2 className={cn([integralCF.className, "text-3xl sm:text-4xl md:text-5xl mb-6 font-bold gradient-text"])}>
            {title}
          </h2>
          <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-3xl py-16 px-6 border-2 border-dashed border-purple-300">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-gray-600 text-lg mb-6">No products available in this section yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full  transition-all font-bold"
            >
              Browse All Gifts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-12 lg:py-16 bg-[#fff9fb]">
  <div className="max-w-frame mx-auto px-4 xl:px-0">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-10"
    >
      <h2 className={cn([integralCF.className, "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 sm:mb-3"])}>{title}</h2>
      <p className="text-gray-700 text-sm sm:text-base">
        Handpicked personalized gifts for you
      </p>
    </motion.div>

    {/* Products Grid */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mb-6 sm:mb-8"
>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 auto-rows-fr">
    {currentProducts.map((product, index) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="flex"
      >
        {/* Make ProductCard take full height of the grid cell */}
        <div className="flex-1 h-full">
          <ProductCard data={product} />
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>



          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8"
            >
              <div className="text-sm text-gray-700 order-2 sm:order-1">
                Showing <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{startIndex + 1}</span> to{' '}
                <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{Math.min(endIndex, data.length)}</span> of{' '}
                <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent">{data.length}</span> products
              </div>

              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn([
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-pink-300 text-pink-600 hover:bg-gradient-to-r hover:bg-rose-500 hover:text-white hover:border-transparent shadow-sm hover:shadow-md"
                  ])}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1 sm:gap-2">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          className={cn([
                            "w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-300",
                            currentPage === page
                              ? "bg-rose-500 text-white  scale-110"
                              : "bg-white border-2 border-purple-200 text-gray-700 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-600 shadow-sm"
                          ])}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn([
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-pink-300 text-pink-600 hover:bg-gradient-to-r hover:bg-rose-500 hover:text-white hover:border-transparent shadow-sm hover:shadow-md"
                  ])}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* View All Button */}
          {viewAllLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Link
                href={viewAllLink}
                className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 border-2 border-rose-500  rounded-full r hover:bg-rose-500 hover:text-white  transition-all duration-300 font-bold text-sm sm:text-base shadow-lg "
              >
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

    </>
  );
};

export default ProductListSec;