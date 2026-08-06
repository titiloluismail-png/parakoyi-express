import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  MessageSquare, 
  Heart, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  Tag,
  Zap
} from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    isFavorite,
    toggleFavorite,
    quickWhatsAppProductOrder,
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isFav = isFavorite(product.id);
  const savings = product.rrpPrice - product.wholesalePrice;
  const savingsPercent = Math.round((savings / product.rrpPrice) * 100);

  const handleQty = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image Side */}
          <div className="bg-slate-50 p-6 flex flex-col justify-between items-center relative border-b sm:border-b-0 sm:border-r border-slate-200/80">
            <div className="w-full flex justify-between items-center z-10">
              {product.badge && (
                <span className="bg-emerald-950 text-amber-300 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isFav ? 'bg-rose-500 text-white' : 'bg-white text-slate-600 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="my-6 max-h-56 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-52 object-contain"
              />
            </div>

            <div className="w-full bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-slate-500">Pack Format:</span>
                <span className="font-bold text-slate-800">{product.packSize}</span>
              </div>
              {product.unitWeight && (
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Approx. Weight:</span>
                  <span className="font-bold text-slate-800">{product.unitWeight}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium text-slate-500">Stock Status:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (Ilorin Hub)
                </span>
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                {product.category.replace('-', ' ')}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {product.name}
              </h2>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-950 text-white p-4 rounded-2xl space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] text-emerald-300 font-medium uppercase">Direct Distributor Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-400 font-sans">
                      ₦{product.wholesalePrice.toLocaleString()}
                    </span>
                    {product.rrpPrice > product.wholesalePrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₦{product.rrpPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {savings > 0 && (
                  <span className="bg-orange-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                    Save ₦{savings.toLocaleString()} / pack ({savingsPercent}%)
                  </span>
                )}
              </div>

              {/* Tier Discounts if available */}
              {product.tierDiscounts && (
                <div className="pt-2 border-t border-emerald-900 space-y-1">
                  <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Bulk Volume Discount Tiers:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {product.tierDiscounts.map((t, idx) => (
                      <div key={idx} className="bg-emerald-900/80 px-2.5 py-1 rounded-lg text-[10px] text-emerald-200 border border-emerald-800">
                        Buy {t.minQty}+ packs → get <span className="font-bold text-amber-300">{t.discountPercent}% extra OFF</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Packs Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => handleQty(-1)}
                    className="p-2 hover:bg-slate-100 text-slate-700"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 font-bold text-slate-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQty(1)}
                    className="p-2 hover:bg-slate-100 text-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right text-xs text-slate-500 font-medium">
                Total: <span className="font-bold text-emerald-950 text-sm font-sans">₦{(product.wholesalePrice * quantity).toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setSelectedProduct(null);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add {quantity} Pack(s) to Cart</span>
              </button>

              <button
                onClick={() => {
                  quickWhatsAppProductOrder(product, quantity);
                  setSelectedProduct(null);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Order Direct on WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
              <Truck className="w-3.5 h-3.5 text-orange-600" />
              <span>Same-day electric tricycle delivery available in Ilorin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
