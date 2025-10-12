// lib/store/cartsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  srcUrl: string;
  attributes: string[];
  discount: { percentage: number; amount: number };
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  adjustedTotalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  adjustedTotalPrice: 0,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && JSON.stringify(i.attributes) === JSON.stringify(action.payload.attributes)
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      state.adjustedTotalPrice = state.totalPrice; // simple, discount logic optional
    },
    removeCartItem(state, action: PayloadAction<{ id: string; attributes: string[] }>) {
      state.items = state.items.filter(
        (i) => !(i.id === action.payload.id && JSON.stringify(i.attributes) === JSON.stringify(action.payload.attributes))
      );
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      state.adjustedTotalPrice = state.totalPrice;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
    },
  },
});

export const { addToCart, removeCartItem, clearCart } = cartsSlice.actions;
export default cartsSlice.reducer;
