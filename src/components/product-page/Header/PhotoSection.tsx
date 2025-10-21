// components/product-page/PhotoSection.tsx or 
// components/product-page/Header/PhotoSection.tsx

"use client";

import { Product } from "@/types/product.types";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // ✅ Use Next.js Image for optimization

const PhotoSection = ({ data }: { data: Product }) => {
  // ✅ Safe image URL with fallback
  const getImageUrl = (product: Product) => {
    return product.srcUrl || product.src_url || '/images/book1.webp';
  };

  const initialImage = getImageUrl(data);
  const [selected, setSelected] = useState<string>(initialImage);

  // ✅ Update selected image if data changes after mount
  useEffect(() => {
    setSelected(initialImage);
  }, [data.id, initialImage]);

  // ✅ Create a safe gallery with fallback images
  const gallery = (data.gallery && data.gallery.length > 0
    ? data.gallery
    : [initialImage, initialImage, initialImage]
  ).slice(0, 3).map(img => img || '/images/book1.webp');

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {/* Thumbnail Gallery */}
      <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center mt-3 lg:mt-0">
        {gallery.map((photo, index) => (
          <button
            key={index}
            type="button"
            className={`bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden border-2 transition-all relative ${
              selected === photo ? 'border-black' : 'border-transparent'
            }`}
            onClick={() => setSelected(photo)}
          >
            <Image
              src={photo}
              alt={`${data.title} - Image ${index + 1}`}
              fill
              className="object-cover hover:scale-110 transition-all duration-500"
              sizes="(max-width: 768px) 25vw, 152px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/book1.webp';
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden">
        <Image
          src={selected}
          alt={data.title || 'Product'}
          fill
          className="object-contain hover:scale-110 transition-all duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/book1.webp';
          }}
        />
      </div>
    </div>
  );
};

export default PhotoSection;