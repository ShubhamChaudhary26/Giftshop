'use client'
import { useState } from 'react';
import { Product } from '@/types/product.types';
import { Truck, RotateCw, Package, Star, DollarSign } from 'lucide-react';

interface TabsProps {
  product?: Product;
}

export default function Tabs({ product }: TabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  const getTabClass = (tabName: string) => {
    return `px-5 sm:px-6 py-4 font-bold transition whitespace-nowrap relative text-sm sm:text-base ${
      activeTab === tabName
        ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600'
        : 'text-gray-500 hover:text-pink-600'
    }`;
  };

  const activeTabIndicator = (tabName: string) => {
    return activeTab === tabName && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500 rounded-t-full"></div>
    );
  };

  return (
    <div className="mb-12 bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md border-2 border-pink-100">
      {/* ✅ Tab Headers with Horizontal Scroll on Mobile */}
      <div className="flex justify-start border-b-2 border-pink-100 mb-6 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('description')}
          className={getTabClass('description')}
        >
          Description
          {activeTabIndicator('description')}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={getTabClass('reviews')}
        >
          Reviews
          {activeTabIndicator('reviews')}
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={getTabClass('shipping')}
        >
          Shipping Info
          {activeTabIndicator('shipping')}
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-700">
            {product?.description ? (
              <div>
                <h3 className="text-xl font-bold mb-4 font-bold bg-rose-500 bg-clip-text text-transparent">Product Description</h3>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.author && (
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100">
                      <p className="text-sm text-gray-500 mb-1">Brand</p>
                      <p className="font-semibold text-gray-800">{product.author}</p>
                    </div>
                  )}
                  {product.stock !== undefined && (
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100">
                      <p className="text-sm text-gray-500 mb-1">Stock Status</p>
                      <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 italic">No description available for this product.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⭐</div>
            {product?.rating && product.rating > 0 ? (
              <div className="mb-6">
                <p className="text-4xl font-bold mb-2 font-bold bg-rose-500 bg-clip-text text-transparent">{product.rating.toFixed(1)}/5</p>
                <p className="text-gray-600 font-semibold">Average Rating</p>
              </div>
            ) : null}
            <p className="text-gray-500 mb-4">No reviews yet.</p>
            <button className="px-6 py-3 bg-rose-500 text-white rounded-full hover:shadow-gift-lg transition font-bold">
              Be the first to review
            </button>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            {[
              {
                icon: <Truck className="w-6 h-6 text-blue-500" />,
                title: "Delivery Time",
                text: "Estimated delivery: 5-7 business days",
                subtext: "Orders placed before 2 PM are shipped same day",
                bgColor: "bg-blue-50"
              },
              {
                icon: <DollarSign className="w-6 h-6 text-green-500" />,
                title: "Shipping Cost",
                text: "Free shipping on orders above ₹499",
                subtext: "Standard shipping: ₹49 for orders below ₹499",
                bgColor: "bg-green-50"
              },
              {
                icon: <RotateCw className="w-6 h-6 text-amber-500" />,
                title: "Return Policy",
                text: "Easy returns within 7 days of delivery",
                subtext: "Product must be unused and in original packaging",
                bgColor: "bg-amber-50"
              },
              {
                icon: <Package className="w-6 h-6 text-purple-500" />,
                title: "Packaging",
                text: "All products are carefully packed to prevent damage",
                subtext: "Eco-friendly packaging materials used",
                bgColor: "bg-purple-50"
              }
            ].map((item, index) => (
              <div key={index} className={`${item.bgColor} p-6 rounded-lg border border-gray-200`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-700">{item.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.subtext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}