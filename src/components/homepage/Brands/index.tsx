'use client';
import React from 'react';

const candleBrandsData = [
  { id: "yankee", name: "Yankee Candle" },
  { id: "bath", name: "Bath & Body Works" },
  { id: "woodwick", name: "WoodWick" },
  { id: "voluspa", name: "Voluspa" },
  { id: "diptyque", name: "Diptyque" },
  { id: "nest", name: "Nest Fragrances" },
  { id: "jo-malone", name: "Jo Malone" },
  { id: "byredo", name: "Byredo" },
];

const RelatedBrands = () => {
  return (
    <section className="py-8 sm:py-10 bg-black overflow-hidden">
      <div className="relative w-full">
        <div className="flex w-max animate-scroll gap-4 sm:gap-8">
          {[...candleBrandsData, ...candleBrandsData].map((brand, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="bg-gray-900 rounded-md sm:rounded-xl px-3 sm:px-8 py-1.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400 hover:text-white transition-all cursor-pointer">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>

     <style jsx>{`
  @keyframes scroll {
    0% { transform: translateX(-50%); } /* start from left */
    100% { transform: translateX(0); }   /* move to original position */
  }
  .animate-scroll {
    display: flex;
    animation: scroll 20s linear infinite;
  }
`}</style>

    </section>
  );
};

export default RelatedBrands;
