import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Utensils, ToggleLeft, ToggleRight } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useMenuItem } from '../store/PriceContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { 
    isEditMode, 
    updatePrice, 
    updateNameFr, 
    updateNameAr, 
    toggleAvailability,
    getItemPrice, 
    getItemNameFr, 
    getItemNameAr, 
    getItemAvailable 
  } = useMenuItem();
  const [imageError, setImageError] = useState(false);
  const [editingPrice, setEditingPrice] = useState<string>('');
  const [editingNameFr, setEditingNameFr] = useState<string>('');
  const [editingNameAr, setEditingNameAr] = useState<string>('');
  
  const currentPrice = getItemPrice(item.id);
  const currentNameFr = getItemNameFr(item.id);
  const currentNameAr = getItemNameAr(item.id);
  const isAvailable = getItemAvailable(item.id);

  const handlePriceChange = (value: string) => {
    setEditingPrice(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updatePrice(item.id, numValue);
    }
  };

  const handleNameFrChange = (value: string) => {
    setEditingNameFr(value);
    updateNameFr(item.id, value);
  };

  const handleNameArChange = (value: string) => {
    setEditingNameAr(value);
    updateNameAr(item.id, value);
  };

  const handlePriceFocus = () => {
    setEditingPrice(currentPrice.toString());
  };

  const handleNameFrFocus = () => {
    setEditingNameFr(currentNameFr);
  };

  const handleNameArFocus = () => {
    setEditingNameAr(currentNameAr);
  };

  return (
    <div className={`bg-white rounded-[20px] p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4 items-center transform transition-all duration-200 hover:shadow-md active:scale-[0.99] ${!isAvailable ? 'opacity-50' : ''}`}>
      {/* Image */}
      <div className="relative w-[88px] h-[88px] flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
        {!imageError && item.image ? (
          <img 
            src={item.image} 
            alt={currentNameFr} 
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Utensils size={32} />
          </div>
        )}
        {item.popular && (
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase tracking-wider flex items-center gap-1">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
            Top
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
        <div className="flex flex-col gap-0.5 mb-2">
          <div className="flex justify-between items-start w-full">
             {isEditMode ? (
               <input
                 type="text"
                 value={editingNameFr || currentNameFr}
                 onChange={(e) => handleNameFrChange(e.target.value)}
                 onFocus={handleNameFrFocus}
                 className="font-bold text-gray-900 leading-tight truncate text-base bg-transparent border-b border-blue-200 focus:outline-none focus:border-blue-400 w-full"
               />
             ) : (
               <h3 className="font-bold text-gray-900 leading-tight truncate text-base">{currentNameFr}</h3>
             )}
          </div>
          {isEditMode ? (
            <input
              type="text"
              value={editingNameAr || currentNameAr}
              onChange={(e) => handleNameArChange(e.target.value)}
              onFocus={handleNameArFocus}
              className="font-arabic text-base text-gray-500 dir-rtl truncate text-right w-full bg-transparent border-b border-blue-200 focus:outline-none focus:border-blue-400"
            />
          ) : (
            <span className="font-arabic text-base text-gray-500 dir-rtl truncate text-right w-full">{currentNameAr}</span>
          )}
        </div>
        
        <div className="flex items-end justify-between mt-auto">
             <div className="flex flex-col">
                 {isEditMode ? (
                   <input
                     type="number"
                     value={editingPrice || currentPrice}
                     onChange={(e) => handlePriceChange(e.target.value)}
                     onFocus={handlePriceFocus}
                     className="text-blue-900 font-bold text-xl leading-none w-24 px-1 py-1 border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                     min="0"
                     step="10"
                   />
                 ) : (
                   <span className="text-blue-900 font-bold text-xl leading-none">
                     {currentPrice} <span className="text-xs font-medium text-gray-400 uppercase">MRU</span>
                   </span>
                 )}
             </div>
            
            <div className="flex items-center gap-2">
              {isEditMode && (
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`p-1 rounded-full transition-colors ${isAvailable ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                  aria-label="Toggle availability"
                >
                  {isAvailable ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isAvailable) {
                    addToCart(item, currentPrice);
                  }
                }}
                className={`group w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 shadow-sm active:scale-90 ${
                  isAvailable 
                    ? 'bg-gray-100 text-gray-900 hover:bg-blue-900 hover:text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Add to cart"
                disabled={!isAvailable}
              >
                <Plus size={22} className={`${isAvailable ? 'group-hover:rotate-90 transition-transform duration-200' : ''}`} />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};