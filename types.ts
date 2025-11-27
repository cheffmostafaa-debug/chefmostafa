export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  nameFr: string;
  nameAr: string;
  icon: string;
  image?: string;
}

export type ViewState = 'LANDING' | 'MENU' | 'CART' | 'AI_HELP';
