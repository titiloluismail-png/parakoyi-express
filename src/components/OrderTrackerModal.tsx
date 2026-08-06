import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Zap, 
  Package,
  ShieldCheck
} from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data/deliveryZones';

export const OrderTrackerModal: React.FC = () => {
  const { isTrackerOpen, setIsTrackerOpen, activeTrackingId, setActiveTrackingId, lastOrder } = useApp();
  const [inputCode, setInputCode] = useState(activeTrackingId || 'PKY-84920');
  const [searchedId, setSearchedId] = useState(activeTrackingId || 'PKY-84920');

  if (!isTrackerOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setSearchedId(inputCode.trim().toUpperCase());
    }
  };

  // Simulated live status based on searched ID
  const isDemoLastOrder = lastOrder && lastOrder.id === searchedId;
  const customerName = isDemoLastOrder ? lastOrder.customer.fullName : 'Alhaji Kunle Ibrahim';
  const deliveryArea = isDemoLastOrder ? lastOrder.customer.areaInIlorin : 'Fate Road / Stadium Gate, GRA, Ilorin';
  const itemCount = isDemoLastOrder ? lastOrder.items.length : 4;
  const totalAmount = isDemoLastOrder ? lastOrder.total : 42500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-amber-400 border border-emerald-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Live Dispatch Tracker</h2>
              <p className="text-xs text-emerald-300">
                Electric Tricycle Fleet Coordination • Ilorin Hub
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="p-2 hover:bg-emerald-900 text-emerald-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tracking Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order Code (e.g. PKY-84920)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-mono uppercase font-bold outline-none focus:border-emerald-700 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              Track Order
            </button>
          </form>

          {/* Active Order Status Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Reference Code</span>
                <span className="text-base font-black text-emerald-950 font-mono">{searchedId}</span>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
                Dispatched via Electric Tricycle EV-04
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block">Recipient:</span>
                <span className="font-bold text-slate-800">{customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Destination Area:</span>
                <span className="font-bold text-slate-800 line-clamp-1">{deliveryArea}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Order Volume:</span>
                <span className="font-bold text-slate-800">{itemCount} Wholesale Pack(s)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Value:</span>
                <span className="font-bold text-emerald-950 font-sans">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Visual Timeline Bar */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Delivery Timeline Progress
              </h4>

              <div className="grid grid-cols-4 gap-2 text-center relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 z-0" />
                <div className="absolute top-4 left-6 w-3/4 h-1 bg-emerald-600 z-0 transition-all duration-700" />

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">1. Order Placed</span>
                  <span className="text-[9px] text-slate-400">10:15 AM</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">2. Confirmed</span>
                  <span className="text-[9px] text-slate-400">10:22 AM</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-orange-100">
                    <Truck className="w-4 h-4 animate-bounce" />
                  </div>
                  <span className="text-[11px] font-bold text-orange-600">3. Dispatched</span>
                  <span className="text-[9px] text-orange-700 font-semibold">En Route ⚡</span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">4. Delivered</span>
                  <span className="text-[9px] text-slate-400">Est 11:10 AM</span>
                </div>
              </div>
            </div>

            {/* Tricycle Rider Info */}
            <div className="bg-emerald-950 text-white p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">
                  ⚡
                </div>
                <div>
                  <span className="font-bold text-white block">Dispatch Rider: Mr. Sodiq (Keke EV #04)</span>
                  <span className="text-emerald-300 text-[10px]">Currently around Fate / Stadium Road Corridor</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, checking status for order ${searchedId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                Call Dispatch
              </a>
            </div>

          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 rounded-xl transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
