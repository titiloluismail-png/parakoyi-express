import React from 'react';
import { useApp, PageView } from '../context/AppContext';
import { Home, Grid, Building2, ShoppingBag, Truck } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage, cartItemCount, setIsCartOpen, setIsTrackerOpen } = useApp();

  const handleNav = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 shadow-lg">
      <div className="grid grid-cols-5 gap-1 text-center">
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'home' ? 'text-emerald-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleNav('products')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'products' ? 'text-emerald-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Products</span>
        </button>

        <button
          onClick={() => handleNav('business')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'business' ? 'text-emerald-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5 text-amber-600" />
          <span className="text-[10px]">Business</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 relative"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5 text-emerald-800" />
          <span className="text-[10px]">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 bg-orange-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsTrackerOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900"
        >
          <Truck className="w-5 h-5 mb-0.5 text-orange-600" />
          <span className="text-[10px]">Track</span>
        </button>
      </div>
    </div>
  );
};
