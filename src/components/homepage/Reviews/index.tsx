"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import ReviewCard from "@/components/common/ReviewCard";
import { reviewsData } from "@/lib/static-data"; // ✅ Direct import
import { Users, Star, Sparkles } from "lucide-react";

const Reviews = () => { // ✅ No props
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!isClient) return null;

  return (
    <section className="overflow-hidden py-12 sm:py-16 lg:py-20 bg-[#fff9fb] relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        whileInView={{ x: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative w-full mb-6 md:mb-9"
        >
          <div className="relative max-w-frame mx-auto mb-6 md:mb-10 px-4 xl:px-0">
            {/* Badge */}
            

            {/* Title */}
            <motion.h2
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn([
                integralCF.className,
                "text-[32px] leading-[36px] md:text-5xl lg:text-6xl capitalize text-center mb-4 gradient-text",
              ])}
            >
              OUR HAPPY CUSTOMERS
            </motion.h2>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base mb-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-400 text-rose-400" />
                  ))}
                </div>
                <span className="font-bold font-bold bg-rose-500 bg-clip-text text-transparent">
                  4.9/5
                </span>
              </div>
              <div className="h-4 w-px bg-gradient-to-b from-pink-300 to-purple-300" />
              <div className="font-semibold font-bold bg-rose-500 bg-clip-text text-transparent">
                {reviewsData.length}+ Reviews
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="hidden absolute right-4 xl:right-0 top-1/2 -translate-y-1/2 items-center gap-2">
              <CarouselPrevious className="bg-white/80 backdrop-blur-sm hover:bg-rose-500 hover:bg-rose-500 text-pink-600 hover:text-white border-2 border-pink-200 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </CarouselPrevious>
              <CarouselNext className="bg-white/80 backdrop-blur-sm hover:bg-rose-500 hover:bg-rose-500 text-pink-600 hover:text-white border-2 border-pink-200 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent>
            {reviewsData.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="w-full max-w-[358px] sm:max-w-[400px] pl-5"
              >
                <ReviewCard
                  className="h-full"
                  data={review}
                  blurChild={
                    reviewsData.length >= 6 && (
                      <div
                        className={cn([
                          isDesktop
                            ? (current + 1 === count
                                ? 0
                                : current + 1 > count
                                ? 1
                                : current + 1) === index &&
                              "backdrop-blur-[2px]"
                            : (current === count ? 0 : current) === index &&
                              "backdrop-blur-[2px]",
                          isDesktop
                            ? (current === 1
                                ? count - 2
                                : current === 2
                                ? count - 1
                                : current - 3) === index &&
                              "backdrop-blur-[2px]"
                            : (current === 1
                                ? count - 1
                                : current === 2
                                ? 0
                                : current - 2) === index &&
                              "backdrop-blur-[2px]",
                          "absolute bg-white/10 right-0 top-0 h-full w-full z-10",
                        ])}
                      />
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          {[...Array(count)].map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn([
                "h-2 rounded-full transition-all duration-300",
                current === index + 1
                  ? "w-8 bg-rose-500 shadow-md"
                  : "w-2 bg-pink-300 hover:bg-rose-500 hover:from-pink-400 hover:to-purple-500"
              ])}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Reviews;