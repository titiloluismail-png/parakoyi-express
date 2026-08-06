import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ILORIN_DELIVERY_ZONES, FREE_DELIVERY_THRESHOLD, WHATSAPP_NUMBER } from '../data/deliveryZones';
import { 
  Truck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Search, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  const { setIsTrackerOpen, setActiveTrackingId } = useApp();
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      setActiveTrackingId(trackInput.trim().toUpperCase());
      setIsTrackerOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Delivery Hero */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-current" /> Electric Tricycle Fleet
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Same-Day Express FMCG Logistics Across Ilorin
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Powered by a dedicated fleet of branded electric tricycles (Keke EV) connecting major beverage distributors directly to your doorstep with zero emissions and lower delivery fees.
          </p>
        </div>
      </div>

      {/* Visual Timeline Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
            Streamlined Process
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            How Same-Day Delivery Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 relative">
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 relative space-y-3">
            <div className="w-10 h-10 bg-emerald-950 text-amber-400 rounded-xl flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Order Placed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Order via website or WhatsApp. Your wholesale drink and staple items are compiled instantly.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 relative space-y-3">
            <div className="w-10 h-10 bg-emerald-950 text-amber-400 rounded-xl flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Distributor Confirmed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inventory verified directly at our GRA / Stadium Road central distribution hub in Ilorin.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 relative space-y-3">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Electric Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assigned to a branded electric tricycle rider for rapid last-mile transit across your neighborhood.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 relative space-y-3">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-black text-lg">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">Doorstep Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Received at your restaurant, hotel, store, or home with cash/POS/transfer options.
            </p>
          </div>

        </div>
      </section>

      {/* Live Order Tracking Box */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> Real-Time Tricycle Lookup
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Track Active Delivery Status
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveTrackingId('PKY-84920');
              setIsTrackerOpen(true);
            }}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700"
          >
            Try Demo Code (PKY-84920)
          </button>
        </div>

        <form onSubmit={handleTrackSubmit} className="max-w-xl flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter your reference code (e.g. PKY-84920)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white uppercase font-mono font-bold outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
          >
            Track Order Live
          </button>
        </form>
      </section>

      {/* Ilorin Delivery Zones Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Ilorin Coverage & Rates</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Delivery Zones & Estimated Times
            </h2>
          </div>

          <div className="bg-amber-100 text-amber-950 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-orange-600" />
            <span>FREE Delivery on Orders Over ₦{FREE_DELIVERY_THRESHOLD.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ILORIN_DELIVERY_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-3 hover:border-emerald-700 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm">{zone.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {zone.estMinutes}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-black text-emerald-950 font-sans block">₦{zone.fee}</span>
                <span className="text-[10px] text-emerald-700 font-bold">Standard Rate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electric Tricycle Advantage Section */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="bg-emerald-900 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Green Technology Mobility
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Why We Use Branded Electric Tricycles (Keke EV)
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-xl">
              Fuel price spikes in Nigeria increase delivery costs for traditional vans. By deploying custom-engineered electric tricycles, Parakoyi Express cuts fuel expenditure to zero — passing those savings directly to you as lower delivery fees and cheaper drink pack prices!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-200 pt-2">
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-800">
                <span className="font-bold text-amber-400 block text-sm">Zero Fuel Surcharges</span>
                <span>Unbeatable flat-rate delivery</span>
              </div>
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-800">
                <span className="font-bold text-amber-400 block text-sm">Quiet Urban Access</span>
                <span>Easily navigates busy market streets</span>
              </div>
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-800">
                <span className="font-bold text-amber-400 block text-sm">Eco-Friendly Ilorin</span>
                <span>Zero tailpipe emissions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-2xl text-center space-y-3 max-w-xs w-full">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 font-black text-2xl mx-auto shadow-md">
                ⚡
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Ilorin Dispatch Hub</h3>
              <p className="text-xs text-slate-500">
                Plot 18, Fate Road, Opposite Stadium Gate, GRA, Ilorin, Kwara State.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Contact Dispatch Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
