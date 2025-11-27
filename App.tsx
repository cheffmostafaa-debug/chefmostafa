import React, { useState } from 'react';
import { MenuItemCard } from './components/MenuItemCard';
import { CartModal } from './components/CartModal';
import { CartProvider, useCart } from './store/CartContext';
import { MenuItemProvider, useMenuItem } from './store/PriceContext';
import { CATEGORIES, MENU_ITEMS } from './data';
import { Search, UtensilsCrossed, ArrowLeft, Edit3 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { addToCart } = useCart();
  const { isEditMode, setIsEditMode } = useMenuItem();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLanding, setIsLanding] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

  const { itemCount, total } = useCart();

  // Filter items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.nameFr.toLowerCase().includes(search.toLowerCase()) ||
      item.nameAr.includes(search);
    return matchesCategory && matchesSearch;
  });

  const handleEnterApp = () => {
    setIsLanding(false);
    setShowCategories(true);
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowCategories(false);
  };

  const handleBackToCategories = () => {
    setShowCategories(true);
    setSearch('');
  };

  if (isLanding) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-50"></div>

        <div className="z-10 flex flex-col items-center gap-8 animate-in zoom-in duration-700 max-w-md w-full">
          <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-blue-900/10 mb-2 border-2 border-dashed border-blue-200">
            <div className="w-28 h-28 flex items-center justify-center text-blue-200">
              <span className="text-sm font-sans">LOGO</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight font-arabic text-blue-900">مطعم الشيف مصطفى</h1>
            <h2 className="text-2xl font-light opacity-90 tracking-widest uppercase text-blue-800">Chef Mustafa Resto</h2>
          </div>

          <div className="w-16 h-1 bg-blue-200 rounded-full"></div>

          <p className="text-lg text-blue-700 font-arabic opacity-90">
            أشهى المأكولات بلمسة عصرية
            <br />
            <span className="text-sm font-sans text-blue-600">Experience the taste of perfection</span>
          </p>

          <button
            onClick={handleEnterApp}
            className="mt-8 w-full bg-blue-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg group"
          >
            <UtensilsCrossed size={22} className="group-hover:rotate-12 transition-transform" />
            <span>Commander / قائمة الطعام</span>
          </button>

          <p className="text-xs text-blue-500 mt-4 font-sans">Tap to view menu & order</p>
        </div>
      </div>
    );
  }

  if (showCategories) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-blue-900 font-arabic">مطعم الشيف مصطفى</h1>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              isEditMode 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Edit3 size={12} className="inline mr-1" />
            Edit
          </button>
        </header>

        {/* Categories Grid */}
        <div className="flex-1 overflow-y-auto p-1">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {CATEGORIES.filter(cat => cat.id !== 'all').map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                className="relative aspect-[4/5] rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-50 hover:border-blue-400 hover:scale-[1.05] active:scale-[0.98] group before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.nameFr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const nextElement = target.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  {/* Animated fallback gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-purple-400 animate-pulse" style={{ display: category.image ? 'none' : 'flex' }}></div>
                </div>
                
                {/* Enhanced Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Text Content with enhanced styling */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-white text-sm mb-1 truncate leading-tight drop-shadow-lg group-hover:text-base transition-all duration-300">{category.nameFr}</h3>
                  <p className="text-xs text-white/95 font-arabic truncate leading-tight drop-shadow-lg group-hover:text-sm transition-all duration-300">{category.nameAr}</p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Bar */}
        <div className="p-4 bg-gradient-to-t from-white via-white/95 to-transparent">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gray-900 text-white p-1 rounded-2xl shadow-xl shadow-gray-900/20 flex items-center justify-between transform transition active:scale-[0.98] hover:bg-gray-800 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-3">
              <div className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold shadow-sm">
                {itemCount}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-sm">Voir Panier</span>
                <span className="text-xs text-gray-400">View Cart</span>
              </div>
            </div>
            <div className="bg-gray-800 h-full px-6 py-4 flex items-center justify-center min-w-[100px]">
              <span className="font-bold text-lg text-white">{total} <span className="text-xs font-normal text-gray-400">MRU</span></span>
            </div>
          </button>
        </div>

        {/* Cart Modal */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <main className="flex-1 flex flex-col h-full relative w-full bg-gray-50">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-sm pb-safe">
          <button
            onClick={handleBackToCategories}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition"
          >
            <ArrowLeft size={26} />
          </button>
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Recherche / بحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-all"
            />
          </div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              isEditMode 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Edit3 size={12} className="inline mr-1" />
            Edit
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-32 lg:pb-6 scroll-smooth">
          <div className="mb-5 flex items-end justify-between px-1">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-arabic leading-tight">
                {CATEGORIES.find(c => c.id === activeCategory)?.nameAr}
              </h2>
              <span className="text-sm text-gray-500 font-medium">{CATEGORIES.find(c => c.id === activeCategory)?.nameFr}</span>
            </div>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-lg">
              {filteredItems.length}
            </span>
          </div>

          {/* List View */}
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Aucun résultat trouvé</p>
            </div>
          )}
        </div>

        {/* Sticky Bottom Cart Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 pb-safe z-10">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gray-900 text-white p-1 rounded-2xl shadow-xl shadow-gray-900/20 flex items-center justify-between transform transition active:scale-[0.98] hover:bg-gray-800 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-3">
              <div className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold shadow-sm">
                {itemCount}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-sm">Voir Panier</span>
                <span className="text-xs text-gray-400">View Cart</span>
              </div>
            </div>
            <div className="bg-gray-800 h-full px-6 py-4 flex items-center justify-center min-w-[100px]">
              <span className="font-bold text-lg text-white">{total} <span className="text-xs font-normal text-gray-400">MRU</span></span>
            </div>
          </button>
        </div>

        {/* Modals */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <MenuItemProvider>
        <MainContent />
      </MenuItemProvider>
    </CartProvider>
  );
};

export default App;