export type CategoryId =
  | 'all'
  | 'soft-drinks'
  | 'bottled-water'
  | 'malt-drinks'
  | 'energy-drinks'
  | 'juices'
  | 'beverages'
  | 'rice-staples'
  | 'household';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  packSize: string;
  wholesalePrice: number; // in Naira
  rrpPrice: number; // Regular Retail Price for comparison
  image: string;
  badge?: string; // e.g. 'Best Seller', 'Top Wholesale Value', 'Same Day Delivery'
  minOrder: number;
  description: string;
  unitWeight?: string;
  inStock: boolean;
  tierDiscounts?: { minQty: number; discountPercent: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estMinutes: string;
  freeDeliveryEligible: boolean;
}

export interface BusinessRegistrationForm {
  businessName: string;
  businessType: 'restaurant' | 'hotel' | 'event_planner' | 'office' | 'provision_store' | 'supermarket' | 'household_bulk';
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  areaInIlorin: string;
  estimatedMonthlySpend: string;
  notes?: string;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  areaInIlorin: string;
  preferredDeliveryTime: string;
  paymentMethod: 'transfer' | 'pay_on_delivery' | 'card';
  orderNotes?: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CheckoutDetails;
  status: 'placed' | 'confirmed' | 'dispatched' | 'delivered';
}
