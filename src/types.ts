export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  fuelType: string;
  isPrimary: boolean;
  healthScore: number;
  engine: number;
  tyres: number;
  battery: number;
  brakes: number;
}

export type OrderStatus = 'completed' | 'en_route' | 'cancelled' | 'pending';

export interface Order {
  id: string;
  serviceType: string;
  providerId: string;
  providerName: string;
  status: OrderStatus;
  date: string;
  amount: number;
  vehicle: string;
  rating?: number;
}

export interface Provider {
  id: string;
  name: string;
  businessName: string;
  rating: number;
  reviews: number;
  distance: number;
  priceRange: string;
  available: string;
  experience: number;
  services: string[];
  avatar: string;
  verified: boolean;
  coverColor: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconLib: string;
  icon: string;
  color: string;
}

export interface ChatThread {
  id: string;
  orderId: string;
  providerName: string;
  providerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: 'provider' | 'user' | string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'reminder' | 'promo' | string;
}
