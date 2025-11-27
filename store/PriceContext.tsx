import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuItemEdits {
  price?: number;
  nameFr?: string;
  nameAr?: string;
  available?: boolean;
}

interface MenuItemContextType {
  edits: Record<string, MenuItemEdits>;
  isEditMode: boolean;
  setIsEditMode: (edit: boolean) => void;
  updatePrice: (itemId: string, newPrice: number) => void;
  updateNameFr: (itemId: string, newName: string) => void;
  updateNameAr: (itemId: string, newName: string) => void;
  toggleAvailability: (itemId: string) => void;
  resetEdits: () => void;
  getItemPrice: (itemId: string) => number;
  getItemNameFr: (itemId: string) => string;
  getItemNameAr: (itemId: string) => string;
  getItemAvailable: (itemId: string) => boolean;
}

const MenuItemContext = createContext<MenuItemContextType | undefined>(undefined);

export const useMenuItem = () => {
  const context = useContext(MenuItemContext);
  if (!context) {
    throw new Error('useMenuItem must be used within a MenuItemProvider');
  }
  return context;
};

export const MenuItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [edits, setEdits] = useState<Record<string, MenuItemEdits>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Load edits from localStorage on mount
  useEffect(() => {
    const savedEdits = localStorage.getItem('restaurant_menu_edits');
    if (savedEdits) {
      try {
        const parsedEdits = JSON.parse(savedEdits);
        setEdits(parsedEdits);
      } catch (error) {
        console.error('Failed to load menu edits from localStorage:', error);
      }
    }
  }, []);

  // Save edits to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(edits).length > 0) {
      localStorage.setItem('restaurant_menu_edits', JSON.stringify(edits));
    }
  }, [edits]);

  const updatePrice = (itemId: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0 || newPrice > 999999) {
      console.warn('Invalid price value:', newPrice);
      return;
    }
    
    setEdits(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], price: newPrice }
    }));
  };

  const updateNameFr = (itemId: string, newName: string) => {
    if (!newName.trim()) return;
    
    setEdits(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], nameFr: newName.trim() }
    }));
  };

  const updateNameAr = (itemId: string, newName: string) => {
    if (!newName.trim()) return;
    
    setEdits(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], nameAr: newName.trim() }
    }));
  };

  const toggleAvailability = (itemId: string) => {
    setEdits(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], available: !prev[itemId]?.available }
    }));
  };

  const resetEdits = () => {
    setEdits({});
    localStorage.removeItem('restaurant_menu_edits');
  };

  const getItemPrice = (itemId: string): number => {
    return edits[itemId]?.price || MENU_ITEMS.find(item => item.id === itemId)?.price || 0;
  };

  const getItemNameFr = (itemId: string): string => {
    return edits[itemId]?.nameFr || MENU_ITEMS.find(item => item.id === itemId)?.nameFr || '';
  };

  const getItemNameAr = (itemId: string): string => {
    return edits[itemId]?.nameAr || MENU_ITEMS.find(item => item.id === itemId)?.nameAr || '';
  };

  const getItemAvailable = (itemId: string): boolean => {
    return edits[itemId]?.available ?? true; // Default to available
  };

  return (
    <MenuItemContext.Provider value={{
      edits,
      isEditMode,
      setIsEditMode,
      updatePrice,
      updateNameFr,
      updateNameAr,
      toggleAvailability,
      resetEdits,
      getItemPrice,
      getItemNameFr,
      getItemNameAr,
      getItemAvailable
    }}>
      {children}
    </MenuItemContext.Provider>
  );
};
