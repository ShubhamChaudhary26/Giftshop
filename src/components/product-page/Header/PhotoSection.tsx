// components/product-page/PhotoSection.tsx
"use client";

import { Product } from "@/types/product.types";
import React, { useState } from "react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);

  // 🆕 Ensure gallery has exactly 3 images for consistent layout
  const gallery = (data.gallery && data.gallery.length > 0 ? data.gallery : [data.srcUrl, data.srcUrl, data.srcUrl]).slice(0, 3);

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {/* 🆕 3-Column Thumbnail Gallery */}
      <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center mt-3 lg:mt-0">
        {gallery.map((photo, index) => (
          <button
            key={index}
            type="button"
            className={`bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden border-2 transition-all ${
              selected === photo ? 'border-black' : 'border-transparent'
            }`}
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo}
              className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
              alt={`${data.title} - Image ${index + 1}`}
              onError={(e) => { e.currentTarget.src = '/images/book1.webp'; }}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden">
        <img
          src={selected}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
          onError={(e) => { e.currentTarget.src = '/images/book1.webp'; }}
        />
      </div>
    </div>
  );
};

export default PhotoSection;