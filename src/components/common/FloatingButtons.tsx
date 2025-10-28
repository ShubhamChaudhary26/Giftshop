// src/components/common/FloatingButtons.tsx
'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const phoneNumber = '919545844195';
  const message = 'Hello! I am interested in your candles.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Button - Bottom Left */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-50">
        <div className="relative group">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 sm:p-3.5 md:p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </a>
          {/* Tooltip - Hidden on mobile, visible on desktop */}
          <span className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </div>
      </div>

      {/* Scroll to Top Button - Bottom Right (Changed from Top) */}
      {showScrollTop && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
          <div className="relative group animate-fade-in">
            <button
              onClick={scrollToTop}
              className="p-3 sm:p-3.5 md:p-4 bg-rose-400 hover:bg-rose-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            {/* Tooltip - Hidden on mobile, visible on desktop */}
            <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Back to top
            </span>
          </div>
        </div>
      )}
    </>
  );
}