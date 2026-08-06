import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, MessageSquare, Heart, Plus, Minus, Eye, Zap, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    isFavorite,
    toggleFavorite,
    setSelectedProduct,
    quickWhatsAppProductOrder,
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const isFav = isFavorite(product.id);

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const savings = product.rrpPrice - product.wholesalePrice;
  const savingsPercent = Math.round((savings / product.rrpPrice) * 100);

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-50/80 rounded-2xl p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-emerald-900 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 text-orange-400" />
              {product.badge}
            </span>
          )}
          {savings > 0 && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Save {savingsPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions (Favorite & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
            title="Save for wholesale reorder"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setSelectedProduct(product)}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-emerald-950 flex items-center justify-center shadow-md transition-all"
            title="Quick Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-md border border-slate-200/60 shadow-xs">
          📦 {product.packSize}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Savings */}
        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-emerald-950 font-sans">
                ₦{product.wholesalePrice.toLocaleString()}
              </span>
              {product.rrpPrice > product.wholesalePrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₦{product.rrpPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-700 font-medium">
              Wholesale Price per Pack
            </p>
          </div>

          {product.tierDiscounts && product.tierDiscounts.length > 0 && (
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-1 rounded-md flex items-center gap-1">
              <Tag className="w-3 h-3 text-amber-700" />
              Bulk Tier Available
            </span>
          )}
        </div>

        {/* Quantity Controls & Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-600">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => handleQtyChange(-1)}
                className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 py-0.5 text-xs font-bold text-slate-800">
                {quantity}
              </span>
              <button
                onClick={() => handleQtyChange(1)}
                className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => quickWhatsAppProductOrder(product, quantity)}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs transition-colors"
              title="Order this product directly on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
