import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { MOCK_ORDERS } from '@/data/mock';
import type { Order, User, Vehicle } from '@/types';

interface AppContextType {
  isLoading: boolean;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  user: User | null;
  vehicles: Vehicle[];
  orders: Order[];
  primaryVehicle: Vehicle | null;
  completeOnboarding: () => Promise<void>;
  login: (user: User, vehicles: Vehicle[]) => Promise<void>;
  logout: () => Promise<void>;
  addVehicle: (vehicle: Vehicle) => Promise<void>;
  setPrimaryVehicle: (id: string) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  rateOrder: (orderId: string, rating: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2021,
    color: 'Silver',
    plate: 'ABC-1234',
    fuelType: 'Petrol',
    isPrimary: true,
    healthScore: 82,
    engine: 90,
    tyres: 75,
    battery: 85,
    brakes: 78,
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    try {
      const [onboarded, authData, vehicleData, orderData] = await Promise.all([
        AsyncStorage.getItem('isOnboarded'),
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('vehicles'),
        AsyncStorage.getItem('orders'),
      ]);
      if (onboarded === 'true') setIsOnboarded(true);
      if (authData) {
        setUser(JSON.parse(authData));
        setIsAuthenticated(true);
      }
      if (vehicleData) {
        setVehicles(JSON.parse(vehicleData));
      }
      if (orderData) {
        setOrders(JSON.parse(orderData));
      } else {
        setOrders(MOCK_ORDERS);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem('isOnboarded', 'true');
    setIsOnboarded(true);
  }, []);

  const login = useCallback(async (newUser: User, newVehicles: Vehicle[]) => {
    await Promise.all([
      AsyncStorage.setItem('user', JSON.stringify(newUser)),
      AsyncStorage.setItem('vehicles', JSON.stringify(newVehicles)),
    ]);
    setUser(newUser);
    setVehicles(newVehicles);
    setOrders(MOCK_ORDERS);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem('user'),
      AsyncStorage.removeItem('vehicles'),
      AsyncStorage.removeItem('orders'),
    ]);
    setUser(null);
    setVehicles([]);
    setOrders([]);
    setIsAuthenticated(false);
  }, []);

  const addVehicle = useCallback(async (vehicle: Vehicle) => {
    setVehicles((prev) => {
      const updated = [...prev, vehicle];
      AsyncStorage.setItem('vehicles', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const setPrimaryVehicle = useCallback(async (id: string) => {
    setVehicles((prev) => {
      const updated = prev.map((v) => ({ ...v, isPrimary: v.id === id }));
      AsyncStorage.setItem('vehicles', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addOrder = useCallback(async (order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      AsyncStorage.setItem('orders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const rateOrder = useCallback(async (orderId: string, rating: number) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, rating } : o));
      AsyncStorage.setItem('orders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const primaryVehicle = vehicles.find((v) => v.isPrimary) ?? vehicles[0] ?? null;

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isOnboarded,
        isAuthenticated,
        user,
        vehicles,
        orders,
        primaryVehicle,
        completeOnboarding,
        login,
        logout,
        addVehicle,
        setPrimaryVehicle,
        addOrder,
        rateOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function usePrimaryVehicle() {
  const { primaryVehicle } = useApp();
  return primaryVehicle;
}

export function useDefaultVehicles(): Vehicle[] {
  return DEFAULT_VEHICLES;
}
