import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ILORIN_DELIVERY_ZONES, FREE_DELIVERY_THRESHOLD, WHATSAPP_NUMBER } from '../data/deliveryZones';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    selectedDeliveryZone,
    setSelectedDeliveryZone,
    currentDeliveryFee,
    cartTotal,
    setIsCheckoutOpen,
    showToast,
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (!isCartOpen) return null;

  const freeDeliveryNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'ILORINFIRST' || code === 'BULK5') {
      setAppliedDiscount(Math.round(cartSubtotal * 0.05));
      showToast('Applied 5% Wholesale Special Discount! 🎉');
    } else {
      showToast('Invalid coupon code. Try "ILORINFIRST"', 'info');
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  // Direct WhatsApp Order generation from cart
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const activeZone = ILORIN_DELIVERY_ZONES.find((z) => z.id === selectedDeliveryZone);
    const zoneName = activeZone ? activeZone.name : 'Ilorin Central';

    let itemsList = cart
      .map(
        (item) =>
          `• *${item.product.name}* (${item.product.packSize})\n  Qty: ${item.quantity} pack(s) @ ₦${item.product.wholesalePrice.toLocaleString()} = ₦${(
            item.product.wholesalePrice * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    let text = `📦 *PARAKOYI EXPRESS - WHOLESALE ORDER*\n`;
    text += `------------------------------------\n`;
    text += `📍 *Delivery Area:* ${zoneName}\n\n`;
    text += `🛒 *ORDERED ITEMS:*\n${itemsList}\n\n`;
    text += `💵 *Subtotal:* ₦${cartSubtotal.toLocaleString()}\n`;
    text += `🚚 *Delivery Fee:* ${currentDeliveryFee === 0 ? 'FREE (Qualifying Order)' : `₦${currentDeliveryFee.toLocaleString()}`}\n`;
    if (appliedDiscount > 0) {
      text += `🏷️ *Wholesale Discount:* -₦${appliedDiscount.toLocaleString()}\n`;
    }
    text += `💰 *TOTAL AMOUNT:* ₦${finalTotal.toLocaleString()}\n\n`;
    text += `Please confirm availability and dispatch tricyle to my address in Ilorin! 🚚⚡`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-900 rounded-xl flex items-center justify-center text-amber-400 border border-emerald-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Your Wholesale Cart</h2>
                <p className="text-xs text-emerald-300">
                  {cart.length} product(s) selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-emerald-900 text-emerald-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Banner */}
          <div className="bg-amber-50 p-3 px-4 border-b border-amber-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                {freeDeliveryNeeded > 0
                  ? `Add ₦${freeDeliveryNeeded.toLocaleString()} more for FREE Delivery across Ilorin!`
                  : '🎉 Congratulations! You unlocked FREE Delivery!'}
              </span>
              <span className="text-amber-700 font-bold">{freeDeliveryProgress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-orange-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse our drinks, water, malt, rice, and household catalog to add wholesale items.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-950 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm hover:bg-emerald-900 transition-all"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-slate-50 rounded-xl p-1.5 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        📦 Pack size: {item.product.packSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-bold text-slate-800 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-emerald-950 font-sans">
                          ₦{(item.product.wholesalePrice * item.quantity).toLocaleString()}
                        </span>
                        <p className="text-[10px] text-slate-400">
                          ₦{item.product.wholesalePrice.toLocaleString()} / pack
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Delivery Zone Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Ilorin Delivery District:</span>
                  <span className="text-[10px] text-emerald-700 font-normal">Calculates fee instantly</span>
                </label>
                <select
                  value={selectedDeliveryZone}
                  onChange={(e) => setSelectedDeliveryZone(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-emerald-700"
                >
                  {ILORIN_DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} (₦{zone.fee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo/Coupon (e.g. ILORINFIRST)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-lg text-xs px-3 py-1.5 uppercase font-medium outline-none focus:border-emerald-700"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-800 font-sans">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Ilorin Delivery:</span>
                  <span className="font-bold text-slate-800 font-sans">
                    {currentDeliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                    ) : (
                      `₦${currentDeliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Wholesale Discount:</span>
                    <span>-₦{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-emerald-950 pt-2 border-t border-slate-300">
                  <span>Total Amount:</span>
                  <span className="text-orange-600 font-sans">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Cart to WhatsApp Hotline</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
