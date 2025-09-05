import { getCartDetails } from '@/lib/cart/get-cart-details';
import { Api } from '@/services/api-client';
import { create } from 'zustand';

export interface CartItemState {
  id: number;
  name: string;
  pizzaType?: number | null;
  pizzaSize?: number | null;
  quantity: number;
  imageUrl: string;
  price: number;
  ingredients: Array<{ name: string; price: number }>;
}

interface CartState {
  loading: boolean;
  error: boolean;
  items: CartItemState[];
  totalAmount: number;

  fetchCartItems: () => Promise<void>;
  inCreaseQuantity: (id: number, quantity: number) => void;
  decreaseQuantity: (id: number, quantity: number) => void;
  addProduct: (product: any) => void; // TODO type
  removeProduct: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: false,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      // TODO remove console
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  inCreaseQuantity: () => set((state) => ({ items: state.items })),
  decreaseQuantity: () => set((state) => ({ items: state.items })),
  addProduct: () => set((state) => ({ items: state.items })),
  removeProduct: () => set((state) => ({ items: state.items })),
}));
