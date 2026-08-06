import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryId, Product } from '../types';
import { 
  Search, 
  Grid as GridIcon, 
  List, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  MessageSquare,
  Wine,
  Droplets,
  Beer,
  Zap,
  CupSoda,
  Coffee,
  Wheat,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/deliveryZones';

export const ProductsPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    quickWhatsAppProductOrder,
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'savings'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.packSize.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.wholesalePrice - b.wholesalePrice;
      if (sortBy === 'price-high') return b.wholesalePrice - a.wholesalePrice;
      if (sortBy === 'savings') return (b.rrpPrice - b.wholesalePrice) - (a.rrpPrice - a.wholesalePrice);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'soft-drinks': return <Wine className="w-4 h-4" />;
      case 'bottled-water': return <Droplets className="w-4 h-4" />;
      case 'malt-drinks': return <Beer className="w-4 h-4" />;
      case 'energy-drinks': return <Zap className="w-4 h-4" />;
      case 'juices': return <CupSoda className="w-4 h-4" />;
      case 'beverages': return <Coffee className="w-4 h-4" />;
      case 'rice-staples': return <Wheat className="w-4 h-4" />;
      case 'household': return <Sparkles className="w-4 h-4" />;
      default: return <GridIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg border border-emerald-900">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Ilorin Wholesale Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Wholesale Drinks & Food Essentials
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">
            Order soft drinks, water, malt, energy drinks, rice, semovita, and household supplies at distributor rates. Direct same-day delivery across Ilorin.
          </p>
        </div>
      </div>

      {/* Filter Category Pills Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-emerald-800" /> Filter by Category:
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-950 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-slate-100 text-slate-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar (Search, Sort, View toggle) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search items in catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-700 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          {/* Count */}
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> product(s)
          </span>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-700"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="savings">Highest Wholesale Savings</option>
            </select>
          </div>

          {/* View Toggles */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-400'}`}
              title="Grid View"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Display */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching items found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or selecting a different product category. You can also message our WhatsApp hotline directly for custom bulk stock inquiries.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-emerald-950 text-white font-semibold text-xs px-5 py-2.5 rounded-full"
            >
              Clear Search Filters
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Ask Stock on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain bg-slate-50 rounded-2xl p-2 border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                      {product.category.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">📦 {product.packSize}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <div className="text-lg font-black text-emerald-950 font-sans">
                    ₦{product.wholesalePrice.toLocaleString()}
                  </div>
                  {product.rrpPrice > product.wholesalePrice && (
                    <span className="text-xs text-slate-400 line-through">
                      RRP: ₦{product.rrpPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => quickWhatsAppProductOrder(product, 1)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs"
                    title="Order direct via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
