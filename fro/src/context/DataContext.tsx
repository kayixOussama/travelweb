import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Destination, Package, initialDestinations, initialPackages } from '../data/mockData';

type DataContextType = {
  destinations: Destination[];
  packages: Package[];
  addDestination: (destination: Destination) => void;
  updateDestination: (destination: Destination) => void;
  deleteDestination: (id: number) => void;
  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: number) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [packages, setPackages] = useState<Package[]>(initialPackages);

  const addDestination = (destination: Destination) => {
    setDestinations([...destinations, { ...destination, id: Date.now() }]);
  };

  const updateDestination = (updatedDestination: Destination) => {
    setDestinations(destinations.map(d => d.id === updatedDestination.id ? updatedDestination : d));
  };

  const deleteDestination = (id: number) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const addPackage = (pkg: Package) => {
    setPackages([...packages, { ...pkg, id: Date.now() }]);
  };

  const updatePackage = (updatedPackage: Package) => {
    setPackages(packages.map(p => p.id === updatedPackage.id ? updatedPackage : p));
  };

  const deletePackage = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      destinations, 
      packages, 
      addDestination, 
      updateDestination, 
      deleteDestination,
      addPackage,
      updatePackage,
      deletePackage
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
