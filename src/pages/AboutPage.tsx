import React from 'react';
import { useApp } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../data/deliveryZones';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Users, 
  Award, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl border border-emerald-900">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            Transforming Distribution in Kwara State
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Building Ilorin's Premier Beverage & FMCG Logistics Platform
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Parakoyi Express bridges the gap between major beverage manufacturers, food mills, and local businesses. Through smart digital ordering and zero-emission electric tricycle fleets, we make wholesale FMCG ordering seamless, affordable, and dependable.
          </p>
        </div>
      </div>

      {/* Origin & Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Reinventing FMCG Last-Mile Supply in Ilorin
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Traditionally, restaurants, hotel managers, and provision store owners in Ilorin spent hours navigating congested markets like Ago, Oja-Oba, and Ipata to haul heavy cases of soft drinks, water, and 50kg bags of rice.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Named after the historic Yoruba title for commercial trade stewards (<em>Parakoyi</em>), **Parakoyi Express** was launched to modernize FMCG trade in Kwara State. By digitizing wholesale inventory and deploying quiet electric tricycles, we deliver factory-direct prices to your door in under 2 hours.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80">
              <span className="text-2xl font-black text-emerald-950 block">10,000+</span>
              <span className="text-xs text-emerald-800 font-medium">Cases Delivered in Ilorin</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80">
              <span className="text-2xl font-black text-amber-950 block">350+</span>
              <span className="text-xs text-amber-900 font-medium">Verified Commercial Partners</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" /> Core Pillar Commitments
          </h3>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-900 rounded-xl flex items-center justify-center font-bold text-amber-400 shrink-0">
                1
              </div>
              <div>
                <strong className="text-white block text-sm">Reliable Same-Day Delivery</strong>
                <span>Guaranteed dispatch slots so your business never turns away a customer due to empty drink coolers.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-900 rounded-xl flex items-center justify-center font-bold text-amber-400 shrink-0">
                2
              </div>
              <div>
                <strong className="text-white block text-sm">Manufacturer Direct Prices</strong>
                <span>Strong relationships with major bottling companies and grain mills mean true distributor wholesale value.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-900 rounded-xl flex items-center justify-center font-bold text-amber-400 shrink-0">
                3
              </div>
              <div>
                <strong className="text-white block text-sm">Sustainable Electric Logistics</strong>
                <span>Operating a clean fleet of electric tricycles (Keke EV) reducing carbon emissions and noise pollution across Kwara State.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Partnerships */}
      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Manufacturer Network</span>
          <h2 className="text-2xl font-black text-slate-900">
            Direct Distributor Partnerships
          </h2>
          <p className="text-xs text-slate-500">
            We partner directly with leading Nigerian beverage and food brands to guarantee authenticity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold text-slate-700 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200">Coca-Cola Hellenic Bottling</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Seven-Up Bottling Company</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Nigerian Breweries Plc</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Nestlé Nigeria Plc</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Flour Mills of Nigeria</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Dangote Sugar Refinery</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">PZ Cussons Nigeria</div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">Rite Foods Ltd (Bigi)</div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to Wholesale Order in Ilorin?</h2>
        <p className="text-emerald-200 text-xs sm:text-sm max-w-lg mx-auto">
          Explore our complete catalog or connect directly with an account officer via WhatsApp.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('products')}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all"
          >
            Explore Catalog
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
};
