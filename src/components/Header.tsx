import React, { useState } from 'react';
import { useApp, PageView } from '../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  MessageSquare, 
  Heart, 
  Truck, 
  Menu, 
  X, 
  ShieldCheck, 
  Building2,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/deliveryZones';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartItemCount,
    favorites,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsTrackerOpen,
    lastOrder,
    repeatLastOrder,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Business Orders', page: 'business' },
    { label: 'Delivery & Zones', page: 'delivery' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-950/10 shadow-sm">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-850">
        <div className="flex items-center gap-3 font-medium">
          <span className="bg-orange-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
            <Zap className="w-3 h-3 fill-current" /> ILORIN SAME-DAY
          </span>
          <span className="hidden md:inline text-emerald-200">
            Wholesale beverages & FMCG essentials delivered directly to your doorstep in Ilorin.
          </span>
          <span className="md:hidden text-emerald-200">
            Same-day wholesale FMCG delivery across Ilorin.
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium">
          <button 
            onClick={() => setIsTrackerOpen(true)}
            className="hover:text-amber-300 transition-colors flex items-center gap-1 bg-emerald-900/80 px-2.5 py-1 rounded-md border border-emerald-800"
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Order</span>
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-300 font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo - Geometric Balance Theme */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 shrink-0"
        >
          <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center shadow-md border border-emerald-800 relative">
            <span className="text-orange-500 font-black text-2xl font-sans leading-none">P</span>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border-2 border-white">
              ⚡
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-emerald-950 font-sans">
                PARAKOYI<span className="text-orange-500">EXPRESS</span>
              </span>
            </div>
            <p className="text-[10px] font-bold text-emerald-900 tracking-wider uppercase">
              Wholesale FMCG & Logistics • Ilorin
            </p>
          </div>
        </div>

        {/* Search Bar - Desktop & Tablet */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-md relative"
        >
          <input
            type="text"
            placeholder="Search drinks, rice, water, semovita, oil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 text-slate-800 placeholder-slate-400 text-sm rounded-full pl-4 pr-10 py-2 transition-all outline-none"
          />
          <button 
            type="submit"
            className="absolute right-3 text-slate-400 hover:text-emerald-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Repeat Last Order Button if exists */}
          {lastOrder && (
            <button
              onClick={repeatLastOrder}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 px-3 py-2 rounded-full transition-colors"
              title="Quickly repeat your previous order"
            >
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Repeat Last Order</span>
            </button>
          )}

          {/* Favorites Button */}
          <button
            onClick={() => handleNavClick('products')}
            className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-slate-50 rounded-full transition-colors relative"
            title="Saved Wholesale Favorites"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-full font-medium text-sm shadow-sm transition-all relative"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-orange-600 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Parakoyi Express! I would like to place a wholesale order for delivery in Ilorin.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-xs tracking-wide uppercase transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current text-emerald-100" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-950 md:hidden rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Links Bar */}
      <nav className="hidden md:block bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center gap-1 font-medium text-sm text-slate-700">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-3 transition-colors border-b-2 font-semibold text-sm ${
                      isActive
                        ? 'border-orange-500 text-emerald-950 font-bold bg-white'
                        : 'border-transparent text-slate-600 hover:text-emerald-900 hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Authorized Distributor Rates • Guaranteed Authentic</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search soft drinks, rice, water..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-3 pr-9 py-2 text-sm text-slate-800 outline-none focus:border-emerald-700"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.page
                    ? 'bg-emerald-950 text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Parakoyi Express! I would like to order wholesale drinks/staples in Ilorin.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Order via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsTrackerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-900 font-medium py-2 rounded-xl text-xs border border-amber-200"
            >
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Track Active Ilorin Delivery</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
