import Image from "next/image";
import React from "react";

const candleBrandsData: { id: string; srcUrl: string }[] = [
  {
    id: "yankee-candle",
    srcUrl: "/icons/candle1.png",
  },
  {
    id: "bath-body-works",
    srcUrl: "/icons/candle2.png",
  },
  {
    id: "jo-malone",
    srcUrl: "/icons/candle3.png",
  },
  {
    id: "diptyque",
    srcUrl: "/icons/candle5.png",
  },
  {
    id: "woodwick",
    srcUrl: "/icons/candle4.png",
  },
];

const CandleBrands = () => {
  return (
    <div className="bg-black">
      <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {candleBrandsData.map((brand) => (
          <Image
            key={brand.id}
            priority
            src={brand.srcUrl}
            height={42}
            width={42}
            alt={brand.id}
            className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[40px] lg:max-h-12 my-5 md:my-11 object-contain brightness-200"
          />
        ))}
      </div>
    </div>
  );
};

export default CandleBrands;
