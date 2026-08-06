import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BusinessRegistrationForm } from '../types';
import { ILORIN_DELIVERY_ZONES, WHATSAPP_NUMBER } from '../data/deliveryZones';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Zap, 
  FileText, 
  UserCheck, 
  Calculator, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const BusinessPage: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState<BusinessRegistrationForm>({
    businessName: '',
    businessType: 'restaurant',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    areaInIlorin: 'Fate & GRA (Fate Road / Shoprite area / Stadium)',
    estimatedMonthlySpend: '₦100,000 - ₦500,000',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quick Wholesale Volume Estimator state
  const [estPacksPerWeek, setEstPacksPerWeek] = useState<number>(25);
  const estMonthlySavings = estPacksPerWeek * 4 * 650; // Average savings per pack vs retail

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.contactPerson || !form.phone) {
      showToast('Please fill in your business name, contact person, and phone number.', 'info');
      return;
    }

    setIsSubmitted(true);
    showToast('Business Account Application Submitted! 🏢');
  };

  const handleSendBusinessWhatsApp = () => {
    let msg = `🏢 *PARAKOYI EXPRESS - BUSINESS ACCOUNT APPLICATION*\n`;
    msg += `------------------------------------------------\n`;
    msg += `🏢 *Business Name:* ${form.businessName}\n`;
    msg += `📋 *Category:* ${form.businessType.replace('_', ' ').toUpperCase()}\n`;
    msg += `👤 *Contact Person:* ${form.contactPerson}\n`;
    msg += `📞 *Phone:* ${form.phone}\n`;
    msg += `📧 *Email:* ${form.email || 'N/A'}\n`;
    msg += `📍 *Location in Ilorin:* ${form.areaInIlorin}\n`;
    msg += `🏠 *Address:* ${form.address}\n`;
    msg += `💰 *Est. Monthly Volume:* ${form.estimatedMonthlySpend}\n`;
    if (form.notes) msg += `📝 *Notes:* ${form.notes}\n`;
    msg += `\nPlease assign an Account Manager and send wholesale catalog rates!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Business Hero Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl border border-emerald-900">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Dedicated B2B FMCG Distribution in Ilorin</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            For Restaurants, Hotels, Offices & Event Planners
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Eliminate inventory shortages and market transport stress. Partner directly with Parakoyi Express for distributor-tier prices, scheduled restocking, dedicated account management, and priority electric tricycle dispatch.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#register-form"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Register Business Account
            </a>

            <button
              onClick={() => {
                const msg = `Hello Parakoyi Express, I manage a business in Ilorin and would like a representative visit to discuss wholesale drinks/staples supply.`;
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="bg-emerald-900 hover:bg-emerald-850 text-emerald-100 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-emerald-700 transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Request Account Rep Visit</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Feature Cards Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Enterprise FMCG Solutions</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Ilorin Businesses Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
              💰
            </div>
            <h3 className="font-bold text-slate-900 text-base">Distributor Wholesale Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bypasses middleman markups. Receive direct manufacturer and mill rates on soft drinks, bottled water, malt, rice, and cooking oil.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center font-bold">
              📅
            </div>
            <h3 className="font-bold text-slate-900 text-base">Scheduled Weekly Restocking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never run out of stock during peak weekends. Set up automated weekly or bi-weekly standing orders tailored to your kitchen or venue schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-orange-50 text-orange-800 rounded-xl flex items-center justify-center font-bold">
              👤
            </div>
            <h3 className="font-bold text-slate-900 text-base">Dedicated Account Manager</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct line to your personal account officer for custom stock requests, emergency extra cases, and priority dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-sky-50 text-sky-800 rounded-xl flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-base">Priority Electric Tricycle Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Commercial orders get top priority assignment on our branded electric tricycles for rapid, quiet delivery right to your store or kitchen door.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-purple-50 text-purple-800 rounded-xl flex items-center justify-center font-bold">
              🧾
            </div>
            <h3 className="font-bold text-slate-900 text-base">Monthly Invoicing & Credit Terms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qualified corporate accounts, hotels, and established supermarkets can unlock flexible 14-day or 30-day post-delivery invoicing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
              🔄
            </div>
            <h3 className="font-bold text-slate-900 text-base">Recurring Auto-Orders</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1-click repeat replenishment for high-turnover items like Eva water cases, Coca-Cola PET, and Semovita bags.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Bulk Savings Calculator */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Interactive Wholesale Calculator
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Estimate Your Business Monthly Savings
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Based on average distributor margins across Kwara State markets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <label className="block text-xs font-bold text-slate-300">
              Estimated Weekly Order Volume (Packs / Cases / Bags):
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={estPacksPerWeek}
                onChange={(e) => setEstPacksPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="font-black text-xl text-amber-400 font-mono shrink-0">
                {estPacksPerWeek} packs/wk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Monthly Units:</span>
                <span className="text-base font-bold text-white">{estPacksPerWeek * 4} packs / month</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Delivery Savings:</span>
                <span className="text-base font-bold text-emerald-400">FREE Ilorin Dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 rounded-2xl border border-emerald-800 text-center space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">Est. Monthly Business Savings</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-sans">
              ₦{estMonthlySavings.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-200">
              Money kept directly in your restaurant or hotel operational cashflow!
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register-form" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
        <div className="border-b border-slate-200 pb-4 space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
            Fast Onboarding
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Register Business Account
          </h2>
          <p className="text-xs text-slate-500">
            Fill out the details below to unlock business tier rates and account management in Ilorin.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-950">Application Received!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Your business application for <span className="font-bold">{form.businessName}</span> has been logged. Our Ilorin Account Officer will contact you within 1 business hour.
            </p>
            <button
              onClick={handleSendBusinessWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Accelerate Approval on WhatsApp</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business / Venue Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanke Palms Hotel & Restaurant"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Category *</label>
                <select
                  value={form.businessType}
                  onChange={(e: any) => setForm({ ...form, businessType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                >
                  <option value="restaurant">Restaurant / Eatery / Lounge</option>
                  <option value="hotel">Hotel / Guest House</option>
                  <option value="event_planner">Event Planner / Caterer</option>
                  <option value="office">Corporate Office / Bank</option>
                  <option value="provision_store">Provision Store / Kiosk</option>
                  <option value="supermarket">Supermarket / Mart</option>
                  <option value="household_bulk">Household Bulk Purchaser</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hajia Rashidat Bello"
                  value={form.contactPerson}
                  onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0814 890 2833"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. orders@tanke-palms.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ilorin Area / District *</label>
                <select
                  value={form.areaInIlorin}
                  onChange={(e) => setForm({ ...form, areaInIlorin: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                >
                  {ILORIN_DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.name}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plot 45 University Road, Tanke, Ilorin"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Monthly FMCG Spend</label>
                <select
                  value={form.estimatedMonthlySpend}
                  onChange={(e) => setForm({ ...form, estimatedMonthlySpend: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                >
                  <option value="Under ₦100,000">Under ₦100,000</option>
                  <option value="₦100,000 - ₦500,000">₦100,000 - ₦500,000</option>
                  <option value="₦500,000 - ₦1,500,000">₦500,000 - ₦1,500,000</option>
                  <option value="Over ₦1,500,000">Over ₦1,500,000 (Key Account)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Products / Order Notes</label>
                <textarea
                  rows={3}
                  placeholder="Mention specific drink packs or rice brands you need daily/weekly..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
              >
                Submit Registration
              </button>

              <button
                type="button"
                onClick={handleSendBusinessWhatsApp}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit & Chat via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
