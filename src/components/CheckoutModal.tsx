import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ILORIN_DELIVERY_ZONES, WHATSAPP_NUMBER } from '../data/deliveryZones';
import { CheckoutDetails, OrderRecord } from '../types';
import { 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Truck, 
  Building2, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Copy,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    currentDeliveryFee,
    cartTotal,
    clearCart,
    saveOrder,
    setActiveTrackingId,
    setIsTrackerOpen,
    showToast,
  } = useApp();

  const [form, setForm] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    deliveryAddress: '',
    areaInIlorin: 'Fate & GRA (Fate Road / Shoprite area / Stadium)',
    preferredDeliveryTime: 'Immediate Express (within 2 hours)',
    paymentMethod: 'pay_on_delivery',
    orderNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.deliveryAddress.trim()) {
      showToast('Please fill in your name, phone number, and Ilorin address.', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `PKY-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: OrderRecord = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryFee: currentDeliveryFee,
        total: cartTotal,
        customer: form,
        status: 'placed',
      };

      saveOrder(newOrder);
      setCreatedOrder(newOrder);
      setIsSubmitting(false);
      clearCart();
      showToast('Order successfully generated! 🚚⚡');
    }, 600);
  };

  const generateOrderWhatsAppMessage = (order: OrderRecord) => {
    let itemsList = order.items
      .map(
        (item) =>
          `• *${item.product.name}* (${item.product.packSize})\n  ${item.quantity} pack(s) @ ₦${item.product.wholesalePrice.toLocaleString()} = ₦${(
            item.product.wholesalePrice * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    let paymentMethodText = 
      order.customer.paymentMethod === 'pay_on_delivery' 
        ? 'Pay on Delivery (Cash / POS)' 
        : order.customer.paymentMethod === 'transfer' 
        ? 'Bank Transfer (Moniepoint / Sterling)' 
        : 'Debit Card';

    let text = `📦 *NEW WHOLESALE ORDER - PARAKOYI EXPRESS*\n`;
    text += `----------------------------------------\n`;
    text += `🆔 *Order Reference:* ${order.id}\n`;
    text += `👤 *Customer Name:* ${order.customer.fullName}\n`;
    text += `📞 *Phone Number:* ${order.customer.phone}\n`;
    text += `📍 *Delivery Zone:* ${order.customer.areaInIlorin}\n`;
    text += `🏠 *Full Address:* ${order.customer.deliveryAddress}\n`;
    text += `⏰ *Delivery Window:* ${order.customer.preferredDeliveryTime}\n`;
    text += `💳 *Payment Method:* ${paymentMethodText}\n`;
    if (order.customer.orderNotes) {
      text += `📝 *Notes:* ${order.customer.orderNotes}\n`;
    }
    text += `\n🛒 *ORDERED ITEMS:*\n${itemsList}\n\n`;
    text += `💵 *Subtotal:* ₦${order.subtotal.toLocaleString()}\n`;
    text += `🚚 *Delivery Fee:* ${order.deliveryFee === 0 ? 'FREE' : `₦${order.deliveryFee.toLocaleString()}`}\n`;
    text += `💰 *TOTAL PAYABLE:* ₦${order.total.toLocaleString()}\n\n`;
    text += `Please confirm dispatch of electric tricycle! 🚚⚡`;

    return text;
  };

  const handleSendToWhatsApp = () => {
    if (!createdOrder) return;
    const text = generateOrderWhatsAppMessage(createdOrder);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyBankDetails = () => {
    navigator.clipboard.writeText('Parakoyi Express Logistics - Sterling Bank 0098421034');
    setCopiedBank(true);
    showToast('Copied Bank Account details to clipboard!');
    setTimeout(() => setCopiedBank(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-emerald-950 text-white flex items-center justify-between sticky top-0 z-20 border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-amber-400 border border-emerald-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {createdOrder ? 'Order Confirmed!' : 'Checkout & Same-Day Delivery'}
              </h2>
              <p className="text-xs text-emerald-300">
                {createdOrder ? `Reference Code: ${createdOrder.id}` : 'Fast dispatch across Ilorin, Kwara State'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCreatedOrder(null);
            }}
            className="p-2 hover:bg-emerald-900 text-emerald-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {createdOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Order Logged • {createdOrder.id}
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Thank you, {createdOrder.customer.fullName}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your order for <span className="font-bold text-slate-900">₦{createdOrder.total.toLocaleString()}</span> has been assigned to our Ilorin Central Distribution Dispatch.
              </p>
            </div>

            {/* Bank Transfer Box if selected */}
            {createdOrder.customer.paymentMethod === 'transfer' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-emerald-700" /> Instant Bank Transfer Details
                  </span>
                  <button
                    onClick={copyBankDetails}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedBank ? 'Copied!' : 'Copy Account'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Bank Name:</span>
                    <span className="font-bold text-slate-900">Sterling Bank / Moniepoint</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Account Number:</span>
                    <span className="font-bold text-emerald-950 font-mono text-sm">0098421034</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Account Name:</span>
                    <span className="font-bold text-slate-900">Parakoyi Express Logistics Ltd</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps CTA */}
            <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl text-left space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 uppercase">
                <MessageSquare className="w-4 h-4 text-emerald-700" /> Next Step: Click Below to Complete on WhatsApp
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Clicking the button below auto-sends your structured order directly to our Ilorin WhatsApp hotline for immediate electric tricycle dispatch!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-3.5 rounded-2xl shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Send Order to WhatsApp Hotline</span>
              </button>

              <button
                onClick={() => {
                  setActiveTrackingId(createdOrder.id);
                  setIsCheckoutOpen(false);
                  setIsTrackerOpen(true);
                  setCreatedOrder(null);
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-sm py-3 rounded-2xl border border-amber-300 transition-all"
              >
                <Truck className="w-4 h-4 text-orange-600" />
                <span>Track Live Delivery Progress</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleCreateOrder} className="p-6 space-y-6">
            
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-emerald-950 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                Customer & Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Alh. Kunle Ibrahim"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-emerald-950 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                Ilorin Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ilorin District / Area *</label>
                  <select
                    name="areaInIlorin"
                    value={form.areaInIlorin}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  >
                    {ILORIN_DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.name}>
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
                  <select
                    name="preferredDeliveryTime"
                    value={form.preferredDeliveryTime}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  >
                    <option value="Immediate Express (within 2 hours)">⚡ Immediate Same-Day (within 2 hours)</option>
                    <option value="Morning Slot (9:00 AM - 12:00 PM)">🌅 Morning Slot (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon Slot (1:00 PM - 4:00 PM)">☀️ Afternoon Slot (1:00 PM - 4:00 PM)</option>
                    <option value="Evening Slot (5:00 PM - 7:00 PM)">🌙 Evening Slot (5:00 PM - 7:00 PM)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Street Address / Landmark *</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    placeholder="e.g. No 14 Fate Road, Opposite Stadium Gate, Ilorin"
                    value={form.deliveryAddress}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-emerald-950 text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                Payment Options
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`cursor-pointer p-3.5 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'pay_on_delivery' 
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_on_delivery"
                      checked={form.paymentMethod === 'pay_on_delivery'}
                      onChange={handleChange}
                    />
                  </div>
                  <span>Pay on Delivery</span>
                  <span className="text-[10px] text-slate-500 font-normal">Cash or POS on arrival</span>
                </label>

                <label className={`cursor-pointer p-3.5 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'transfer' 
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={form.paymentMethod === 'transfer'}
                      onChange={handleChange}
                    />
                  </div>
                  <span>Bank Transfer</span>
                  <span className="text-[10px] text-slate-500 font-normal">Instant Moniepoint/Sterling</span>
                </label>

                <label className={`cursor-pointer p-3.5 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'card' 
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-slate-600" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                  </div>
                  <span>Online Card Payment</span>
                  <span className="text-[10px] text-slate-500 font-normal">Debit Card Secured</span>
                </label>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-900 text-white p-4.5 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Items Subtotal ({cart.length} items):</span>
                <span className="font-bold text-white font-sans">₦{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Ilorin Delivery Fee:</span>
                <span className="font-bold text-white font-sans">
                  {currentDeliveryFee === 0 ? 'FREE' : `₦${currentDeliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-amber-400 border-t border-slate-800 pt-2">
                <span>Total Amount Payable:</span>
                <span className="font-sans">₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base py-3.5 rounded-2xl shadow-lg transition-all"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Confirm Order & Generate WhatsApp Message</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
