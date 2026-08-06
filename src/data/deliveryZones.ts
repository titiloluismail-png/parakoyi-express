import { DeliveryZone } from '../types';

export const ILORIN_DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'tanke', name: 'Tanke (University Road / Oke-Odo / Tipper Garage)', fee: 500, estMinutes: '30 - 45 mins', freeDeliveryEligible: true },
  { id: 'fate', name: 'Fate & GRA (Fate Road / Shoprite area / Stadium)', fee: 400, estMinutes: '20 - 35 mins', freeDeliveryEligible: true },
  { id: 'challenge', name: 'Challenge & Post Office Central', fee: 450, estMinutes: '25 - 40 mins', freeDeliveryEligible: true },
  { id: 'taiwo', name: 'Taiwo Isale & Taiwo Oke', fee: 450, estMinutes: '25 - 40 mins', freeDeliveryEligible: true },
  { id: 'asa-dam', name: 'Asa Dam Road & Egbejila', fee: 600, estMinutes: '35 - 50 mins', freeDeliveryEligible: true },
  { id: 'geri-alimi', name: 'Geri Alimi & Sawmill Area', fee: 550, estMinutes: '30 - 45 mins', freeDeliveryEligible: true },
  { id: 'unilorin', name: 'Unilorin Permanent Site (PS)', fee: 800, estMinutes: '45 - 60 mins', freeDeliveryEligible: true },
  { id: 'kulende', name: 'Kulende & Sango Estate', fee: 600, estMinutes: '35 - 50 mins', freeDeliveryEligible: true },
  { id: 'ganmo', name: 'Ganmo & Offa Garage Junction', fee: 700, estMinutes: '40 - 55 mins', freeDeliveryEligible: true },
  { id: 'adewole', name: 'Adewole Estate & Olorunsogo', fee: 500, estMinutes: '30 - 45 mins', freeDeliveryEligible: true },
  { id: 'kilanko', name: 'Kilanko & Pipeline Area', fee: 550, estMinutes: '35 - 45 mins', freeDeliveryEligible: true },
  { id: 'airport-rd', name: 'Airport Road & Ilorin Airport Junction', fee: 850, estMinutes: '45 - 60 mins', freeDeliveryEligible: true },
];

export const FREE_DELIVERY_THRESHOLD = 35000; // Free delivery across Ilorin for orders over ₦35,000

export const WHATSAPP_NUMBER = '2349062153662'; // Official Parakoyi Express Ilorin Hotline
export const WHATSAPP_DISPLAY = '+234 90';
export const OFFICE_ADDRESS = 'Block F20, Shop 6, Mandate Ultra Modern Market, Western Reseviour Area, Adewole, Ilorin, Kwara State';
export const CONTACT_EMAIL = 'orders@parakoyiexpress.ng';
