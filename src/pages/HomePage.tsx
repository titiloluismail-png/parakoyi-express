import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TrustBadges } from '../components/TrustBadges';
import { WHATSAPP_NUMBER } from '../data/deliveryZones';
import { CategoryId } from '../types';
import { 
  MessageSquare, 
  ArrowRight, 
  Truck, 
  Building2, 
  Zap, 
  ShieldCheck, 
  Tag, 
  Clock, 
  Star,
  CheckCircle2,
  ChevronRight,
  Wine,
  Droplets,
  Beer,
  CupSoda,
  Coffee,
  Wheat,
  Sparkles,
  Grid
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategory, lastOrder, repeatLastOrder, setIsTrackerOpen } = useApp();

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine': return <Wine className="w-6 h-6 text-emerald-700" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'Beer': return <Beer className="w-6 h-6 text-amber-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-orange-600" />;
      case 'CupSoda': return <CupSoda className="w-6 h-6 text-rose-600" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-emerald-800" />;
      case 'Wheat': return <Wheat className="w-6 h-6 text-amber-700" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-600" />;
      default: return <Grid className="w-6 h-6 text-emerald-800" />;
    }
  };

  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-12 pb-12">
      
      {/* HERO SECTION - Geometric Balance Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/40 text-slate-900 pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        
        {/* Geometric Background Rings */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[450px] border-2 border-slate-100 rounded-full pointer-events-none hidden lg:block" />
        <div className="absolute top-1/2 right-24 -translate-y-1/2 w-[350px] h-[350px] border-2 border-emerald-100/80 rounded-full pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Geometric Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <span>Same-Day FMCG Delivery in Ilorin</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-emerald-950 leading-[1.15] tracking-tight">
                Wholesale-priced drinks & household essentials <span className="text-orange-500 underline underline-offset-4 decoration-2">delivered.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Order soft drinks, water, rice, semovita, beverages, and everyday essentials at distributor-level prices with fast dispatch across Kwara State.
              </p>

              {/* CTA Buttons - Geometric Balance standard */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Parakoyi Express! I would like to place a wholesale order for delivery in Ilorin.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <span>Order on WhatsApp</span>
                  <MessageSquare className="w-5 h-5 fill-current" />
                </a>

                <button
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                </button>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 text-center lg:text-left text-xs text-slate-600">
                <div>
                  <span className="block font-bold text-emerald-950 text-sm">Distributor Rates</span>
                  <span>Save up to 15% vs retail</span>
                </div>
                <div>
                  <span className="block font-bold text-orange-600 text-sm">⚡ Same-Day</span>
                  <span>Dispatched in &lt; 2 hours</span>
                </div>
                <div>
                  <span className="block font-bold text-emerald-900 text-sm">🔋 Electric Fleet</span>
                  <span>Quiet & eco-friendly delivery</span>
                </div>
              </div>

            </div>

            {/* Right Column Geometric Graphic Grid */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                
                {/* Floating Geometric Card 1 */}
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 w-48 sm:w-52 hover:border-emerald-200 transition-all">
                  <div className="w-full aspect-square bg-emerald-50/70 rounded-2xl mb-3 flex flex-col items-center justify-center p-3 relative text-center">
                    <span className="text-3xl mb-1">🥤</span>
                    <span className="text-[10px] font-bold text-emerald-900 uppercase bg-white px-2 py-0.5 rounded-full shadow-xs">Soft Drinks</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1">Coke Classic Case</h3>
                  <p className="text-[11px] text-slate-500 font-medium">12 Bottles • 50cl Each</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-black text-emerald-900">₦3,850</span>
                    <span className="text-xs text-slate-400 line-through">₦4,200</span>
                  </div>
                </div>

                {/* Floating Geometric Card 2 (Staggered offset) */}
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 w-48 sm:w-52 mt-8 hover:border-emerald-200 transition-all">
                  <div className="w-full aspect-square bg-amber-50/70 rounded-2xl mb-3 flex flex-col items-center justify-center p-3 relative text-center">
                    <span className="text-3xl mb-1">💧</span>
                    <span className="text-[10px] font-bold text-amber-900 uppercase bg-white px-2 py-0.5 rounded-full shadow-xs">Eva Water</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1">Eva Pure Water</h3>
                  <p className="text-[11px] text-slate-500 font-medium">12 Bottles • 75cl Each</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-black text-emerald-900">₦2,400</span>
                    <span className="text-xs text-slate-400 line-through">₦2,800</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Repeat Last Order Banner if available */}
      {lastOrder && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center font-bold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-amber-950 text-sm">Repeat Your Last Order ({lastOrder.id})</h3>
                <p className="text-xs text-amber-900">
                  {lastOrder.items.length} items totaling ₦{lastOrder.total.toLocaleString()} sent to {lastOrder.customer.areaInIlorin}
                </p>
              </div>
            </div>

            <button
              onClick={repeatLastOrder}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              1-Click Re-Order
            </button>
          </div>
        </section>
      )}

      {/* CATEGORY CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Explore Wholesale Catalog</span>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-3 mt-1">
              <span className="w-2 h-7 bg-orange-500 rounded-full shrink-0" />
              <span>Distributor Categories</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Select a category to view wholesale pack prices
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id as CategoryId)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl flex items-center justify-center mb-3 transition-colors border border-slate-100">
                {getCategoryIcon(cat.icon)}
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{cat.count} Items</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WHOLESALE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider bg-emerald-100 px-2.5 py-1 rounded-full">
              Fastest Moving Products in Ilorin
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-3 mt-2">
              <span className="w-2 h-7 bg-orange-500 rounded-full shrink-0" />
              <span>Trending Wholesale Deals</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BUSINESS ORDERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-orange-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Bulk Account Registration
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                For Restaurants, Hotels, Offices & Event Planners in Ilorin
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed max-w-xl">
                Get dedicated account management, scheduled weekly deliveries, tier volume discounts, priority dispatch, and 30-day invoice terms for verified businesses.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-emerald-200 pt-2">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Wholesale Pricing</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Scheduled Deliveries</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Priority Tricycle Fleet</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => {
                  setActivePage('business');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                Register Business Account
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-900/40 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* TESTIMONIALS / LOCAL TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Trusted Across Kwara State</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What Ilorin Business Owners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Parakoyi Express has changed how we stock soft drinks and water for our restaurant in Tanke. Delivery is always within 45 minutes on their electric keke, and their wholesale price per pack beats Kwara State markets!"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-900 text-xs block">Chef Ganiyu A.</span>
              <span className="text-[10px] text-slate-500">Manager, Royal Grill & Lounge (Tanke, Ilorin)</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "We ordered 50 bags of Mama Gold Rice and cases of Maltina for an event along Fate Road. Parakoyi Express delivered everything direct from the distributor mill on time. Highly reliable!"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-900 text-xs block">Hajia Aisha Bello</span>
              <span className="text-[10px] text-slate-500">Event Planner, Fate GRA Ilorin</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "As a provision store owner at Challenge Post Office, ordering on WhatsApp takes 30 seconds. The electric tricycle brings our items cleanly to the shop without transport hassle."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-900 text-xs block">Mr. Kayode Ogundele</span>
              <span className="text-[10px] text-slate-500">Owner, Choice Mart (Post Office, Ilorin)</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
