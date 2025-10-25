"use client";

import { Product } from "@/types/product.types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, ImageOff } from "lucide-react";

const PhotoSection = ({ data }: { data: Product }) => {
  const getImageUrl = (product: Product) => {
    return product.srcUrl || product.src_url || '';
  };

  const initialImage = getImageUrl(data);
  const [selected, setSelected] = useState<string>(initialImage);

  useEffect(() => {
    setSelected(initialImage);
  }, [data.id, initialImage]);

  const gallery = (data.gallery && data.gallery.length > 0
    ? data.gallery
    : [initialImage, initialImage, initialImage]
  ).slice(0, 3).map(img => img || '');

  const fallbackImage = 'https://via.placeholder.com/400x600/f3e8ff/a855f7?text=BestGiftEver';

  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-4">
      {/* Thumbnail Gallery */}
      <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-4 w-full md:w-auto items-center justify-center md:justify-start mt-3 md:mt-0">
        {gallery.map((photo, index) => (
          <button
            key={index}
            type="button"
            className={`bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg sm:rounded-xl aspect-square overflow-hidden border-2 transition-all w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative group ${
              selected === photo ? 'border-pink-500 shadow-md' : 'border-pink-200 hover:border-rose-500'
            }`}
            onClick={() => setSelected(photo)}
          >
            <Image
              src={photo || fallbackImage}
              alt={`${data.title} - Image ${index + 1}`}
              fill
              className="object-contain p-2 group-hover:scale-110 transition-all duration-500"
              sizes="(max-width: 768px) 25vw, 15vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
     {/* Main Image */}
<div className="relative flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl sm:rounded-2xl w-full mx-auto aspect-square md:aspect-auto md:h-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden border-2 border-pink-100 shadow-lg">
  {selected ? (
    <Image
      src={selected}
      alt={data.title || 'Product'}
      fill
      className="object-cover hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center text-purple-300"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-off"><path d="M21.08 21.08a2 2 0 0 1-2.83 0l-16-16a2 2 0 0 1 0-2.83s0 0 0 0a2 2 0 0 1 2.83 0L21.08 21.08z"/><path d="M11 21H7a2 2 0 0 1-2-2V7"/><path d="M21 13V7a2 2 0 0 0-2-2h-6"/><path d="M16 16l-3-3-4 4"/><circle cx="8" cy="8" r="1"/></svg><p class="mt-2 text-sm">Image not available</p></div>`;
        }
      }}
    />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center text-purple-300">
      <ImageOff className="w-16 h-16" />
      <p className="mt-2 text-sm">Image not available</p>
    </div>
  )}
</div>

    </div>
  );
};

export default PhotoSection;