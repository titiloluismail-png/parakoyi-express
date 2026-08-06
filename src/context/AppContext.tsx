import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CategoryId, OrderRecord } from '../types';
import { PRODUCTS } from '../data/products';
import { ILORIN_DELIVERY_ZONES, FREE_DELIVERY_THRESHOLD } from '../data/deliveryZones';

export type PageView = 'home' | 'products' | 'business' | 'delivery' | 'about' | 'contact';

interface AppContextType {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  selectedDeliveryZone: string;
  setSelectedDeliveryZone: (zoneId: string) => void;
  currentDeliveryFee: number;
  cartTotal: number;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
  lastOrder: OrderRecord | null;
  saveOrder: (order: OrderRecord) => void;
  repeatLastOrder: () => void;
  quickWhatsAppProductOrder: (product: Product, quantity?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart state stored in localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('parakoyi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parakoyi_favs');
      return saved ? JSON.parse(saved) : ['sd-01', 'bw-01', 'rs-01'];
    } catch {
      return ['sd-01', 'bw-01', 'rs-01'];
    }
  });

  // Selected Delivery Zone for instant dynamic fee calculation
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<string>('fate');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('PKY-84920');

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Last Order memory
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(() => {
    try {
      const saved = localStorage.getItem('parakoyi_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('parakoyi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('parakoyi_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity} x ${product.name} to wholesale cart 🛒`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.wholesalePrice * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const activeZoneObj = ILORIN_DELIVERY_ZONES.find((z) => z.id === selectedDeliveryZone);
  const zoneFee = activeZoneObj ? activeZoneObj.fee : 500;
  const currentDeliveryFee = cartSubtotal >= FREE_DELIVERY_THRESHOLD || cartSubtotal === 0 ? 0 : zoneFee;
  const cartTotal = cartSubtotal + currentDeliveryFee;

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wholesale favorites ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const saveOrder = (order: OrderRecord) => {
    setLastOrder(order);
    try {
      localStorage.setItem('parakoyi_last_order', JSON.stringify(order));
    } catch (e) {
      console.error(e);
    }
  };

  const repeatLastOrder = () => {
    if (!lastOrder || !lastOrder.items.length) {
      showToast('No previous order found to repeat', 'info');
      return;
    }
    setCart(lastOrder.items);
    setIsCartOpen(true);
    showToast('Loaded your last order into cart! 🛍️');
  };

  const quickWhatsAppProductOrder = (product: Product, quantity = 1) => {
    const total = product.wholesalePrice * quantity;
    const msg = `Hello Parakoyi Express! I would like to order directly:\n\n*Product:* ${product.name} (${product.packSize})\n*Quantity:* ${quantity} pack(s)\n*Wholesale Total:* ₦${total.toLocaleString()}\n\nPlease send your account details or confirm same-day delivery to my address in Ilorin.`;
    const url = `https://wa.me/2348148902833?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartItemCount,
        selectedDeliveryZone,
        setSelectedDeliveryZone,
        currentDeliveryFee,
        cartTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackerOpen,
        setIsTrackerOpen,
        activeTrackingId,
        setActiveTrackingId,
        toast,
        showToast,
        lastOrder,
        saveOrder,
        repeatLastOrder,
        quickWhatsAppProductOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
