import React from 'react';
import { useApp, PageView } from '../context/AppContext';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, OFFICE_ADDRESS, CONTACT_EMAIL } from '../data/deliveryZones';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useApp();

  const handleNav = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (catId: any) => {
    setSelectedCategory(catId);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-14 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center shadow-md border border-emerald-800 shrink-0">
                <span className="text-orange-500 font-black text-2xl font-sans leading-none">P</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-sans">
                PARAKOYI<span className="text-orange-500">EXPRESS</span>
              </span>
            </div>
            
            <p className="text-emerald-200/90 text-sm leading-relaxed max-w-md">
              Technology-enabled FMCG distribution and last-mile delivery company in Ilorin, Kwara State. We supply drinks, water, malt, energy drinks, rice, semovita, and everyday essentials at distributor prices with fast electric tricycle delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-full transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => handleNav('business')}
                className="inline-flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold px-4 py-2.5 rounded-full border border-emerald-800 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Business Orders</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-l-2 border-orange-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-amber-300 transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('business')} className="hover:text-amber-300 transition-colors">
                  Bulk & Business Accounts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('delivery')} className="hover:text-amber-300 transition-colors">
                  Delivery Zones & Fees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-300 transition-colors">
                  About Parakoyi Express
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-300 transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-l-2 border-orange-500 pl-2.5">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button onClick={() => handleCategoryNav('soft-drinks')} className="hover:text-amber-300 transition-colors">
                  Soft Drinks (50cl Packs)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('bottled-water')} className="hover:text-amber-300 transition-colors">
                  Eva & Bottled Water
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('malt-drinks')} className="hover:text-amber-300 transition-colors">
                  Malt Drinks (Cans & PET)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('energy-drinks')} className="hover:text-amber-300 transition-colors">
                  Energy Drinks
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('rice-staples')} className="hover:text-amber-300 transition-colors">
                  Mama Gold Rice & Semovita
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('household')} className="hover:text-amber-300 transition-colors">
                  Household Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-l-2 border-orange-500 pl-2.5">
              Ilorin Distribution Hub
            </h4>
            <ul className="space-y-3 text-xs text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-medium">Dispatch Hours: Mon – Sat (7:30 AM – 7:00 PM)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <p>
            © {new Date().getFullYear()} Parakoyi Express Distribution Ltd. All rights reserved. Ilorin, Kwara State, Nigeria.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer" onClick={() => handleNav('delivery')}>Same-Day Delivery Policy</span>
            <span className="hover:underline cursor-pointer" onClick={() => handleNav('business')}>Wholesale Terms</span>
            <span className="hover:underline cursor-pointer" onClick={() => handleNav('contact')}>Customer Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
