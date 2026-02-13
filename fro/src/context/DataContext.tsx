import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Destination, Package } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

type DataContextType = {
  destinations: Destination[];
  packages: Package[];
  loading: boolean;
  addDestination: (destination: Omit<Destination, 'id'>) => Promise<void>;
  updateDestination: (destination: Destination) => Promise<void>;
  deleteDestination: (id: number) => Promise<void>;
  addPackage: (pkg: Omit<Package, 'id'>) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: number) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [destRes, pkgRes] = await Promise.all([
          fetch(`${API_URL}/destinations`),
          fetch(`${API_URL}/packages`),
        ]);
        const destJson = await destRes.json();
        const pkgJson = await pkgRes.json();
        setDestinations(destJson.data);
        setPackages(pkgJson.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addDestination = async (destination: Omit<Destination, 'id'>) => {
    const res = await fetch(`${API_URL}/destinations`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(destination),
    });
    const { data } = await res.json();
    setDestinations((prev) => [...prev, data]);
  };

  const updateDestination = async (destination: Destination) => {
    const res = await fetch(`${API_URL}/destinations/${destination.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(destination),
    });
    const { data } = await res.json();
    setDestinations((prev) => prev.map((d) => (d.id === data.id ? data : d)));
  };

  const deleteDestination = async (id: number) => {
    await fetch(`${API_URL}/destinations/${id}`, { method: 'DELETE', headers: authHeaders() });
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const addPackage = async (pkg: Omit<Package, 'id'>) => {
    const res = await fetch(`${API_URL}/packages`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(pkg),
    });
    const { data } = await res.json();
    setPackages((prev) => [...prev, data]);
  };

  const updatePackage = async (pkg: Package) => {
    const res = await fetch(`${API_URL}/packages/${pkg.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(pkg),
    });
    const { data } = await res.json();
    setPackages((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  const deletePackage = async (id: number) => {
    await fetch(`${API_URL}/packages/${id}`, { method: 'DELETE', headers: authHeaders() });
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DataContext.Provider value={{
      destinations,
      packages,
      loading,
      addDestination,
      updateDestination,
      deleteDestination,
      addPackage,
      updatePackage,
      deletePackage,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
