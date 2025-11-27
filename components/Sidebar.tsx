import React from 'react';
import { Category } from '../types';
import { Pizza, Utensils, Scroll, Sandwich, Drumstick, Salad, CupSoda, IceCream, X } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Mapping category icon strings to Lucide components
const iconMap: any = {
  Pizza,
  Utensils,
  Scroll,
  Sandwich,
  Drumstick,
  Salad,
  CupSoda,
  IceCream
};

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onSelectCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:shadow-none border-l border-gray-100 flex flex-col`}
      >
        {/* Header */}
        <div className="h-40 bg-gradient-to-br from-primary via-orange-500 to-orange-600 p-6 flex flex-col justify-end relative overflow-hidden">
          <div className="absolute -left-6 -top-6 opacity-10 text-white rotate-12">
            <Utensils size={160} />
          </div>

          <div className="relative z-10 text-white text-right">
            <h1 className="text-3xl font-bold font-arabic leading-tight mb-1 drop-shadow-md">مطعم مصطفى</h1>
            <div className="flex items-center justify-end gap-2 opacity-95">
              <p className="text-xs uppercase tracking-widest font-bold text-white/90">Mustafa Resto</p>
              <span className="h-0.5 w-8 bg-white/60 rounded-full"></span>
            </div>
          </div>

          <button onClick={onClose} className="absolute top-4 left-4 lg:hidden text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* Categories */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
          <div className="px-2 mb-4 flex items-center justify-between border-b border-gray-50 pb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu / Catégories</span>
            <span className="text-sm font-bold text-gray-400 font-arabic">القائمة</span>
          </div>

          <ul className="space-y-2.5">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Utensils;
              const isActive = activeCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full group flex items-stretch justify-between rounded-2xl transition-all duration-300 overflow-hidden border ${isActive
                        ? 'bg-gradient-to-l from-orange-500 to-primary text-white shadow-lg shadow-orange-500/30 border-transparent scale-[1.02]'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent hover:border-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-3 py-3.5 pl-4">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-primary'
                        }`}>
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <span className={`text-[13px] font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {cat.nameFr}
                      </span>
                    </div>

                    <div className={`flex items-center px-5 py-3 ${isActive ? 'bg-black/10 backdrop-blur-sm' : 'bg-gray-50/50 group-hover:bg-gray-100'
                      }`}>
                      <span className={`text-sm font-arabic font-bold ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {cat.nameAr}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm flex flex-col items-center gap-2">
          <div className="flex gap-4 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium tracking-wider">Mustafa Resto 2024 ©</p>
        </div>
      </aside>
    </>
  );
};
