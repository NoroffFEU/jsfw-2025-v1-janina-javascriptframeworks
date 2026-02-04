import { create } from "zustand";
import type { CartItem } from "@/types/cart.types";
import type { Product } from "@/types/product.types";

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotal: () =>
    get().items.reduce(
      (sum, i) => sum + i.quantity * i.product.discountedPrice,
      0
    ),
}));
