// lib/features/carts/cartsSlice.ts or lib/store/cartsSlice.ts

import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ✅ Safe calculation with fallbacks
const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  // ✅ Safe discount access with fallbacks
  const discountPercentage = data.discount?.percentage || 0;
  const discountAmount = data.discount?.amount || 0;
  
  let itemPrice = data.price;
  
  if (discountPercentage > 0) {
    itemPrice = Math.round(data.price - (data.price * discountPercentage) / 100);
  } else if (discountAmount > 0) {
    itemPrice = Math.round(data.price - discountAmount);
  }
  
  return itemPrice * (quantity || data.quantity);
};

export type RemoveCartItem = {
  id: number | string;  // ✅ Support both number and string
  attributes: string[];
};

export type CartItem = {
  id: number | string;  // ✅ Support both
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

// Define a type for the slice state
interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
}

// Define the initial state using that type
const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // ✅ Validate payload
      if (!action.payload || !action.payload.id) {
        console.error('Invalid cart item');
        return;
      }

      // if cart is empty then add
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice = action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice = calcAdjustedTotalPrice(0, action.payload);
        state.action = "add";
        return;
      }

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items.map((eachCartItem) => {
            if (
              eachCartItem.id === action.payload.id &&
              compareArrays(eachCartItem.attributes, action.payload.attributes)
            ) {
              return {
                ...eachCartItem,
                quantity: action.payload.quantity + eachCartItem.quantity,
              };
            }
            return eachCartItem;
          }),
          totalQuantities: state.cart.totalQuantities + action.payload.quantity,
        };
        state.totalPrice += action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice += calcAdjustedTotalPrice(0, action.payload);
        state.action = "update";
        return;
      }

      // Add new item
      state.cart = {
        ...state.cart,
        items: [...state.cart.items, action.payload],
        totalQuantities: state.cart.totalQuantities + action.payload.quantity,
      };
      state.totalPrice += action.payload.price * action.payload.quantity;
      state.adjustedTotalPrice += calcAdjustedTotalPrice(0, action.payload);
      state.action = "add";
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (state.cart === null) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      const newQuantity = isItemInCart.quantity - 1;

      if (newQuantity <= 0) {
        // Remove item completely
        state.cart = {
          ...state.cart,
          items: state.cart.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                compareArrays(item.attributes, action.payload.attributes)
              )
          ),
          totalQuantities: state.cart.totalQuantities - isItemInCart.quantity,
        };
      } else {
        // Decrease quantity
        state.cart = {
          ...state.cart,
          items: state.cart.items.map((eachCartItem) => {
            if (
              eachCartItem.id === action.payload.id &&
              compareArrays(eachCartItem.attributes, action.payload.attributes)
            ) {
              return {
                ...eachCartItem,
                quantity: newQuantity,
              };
            }
            return eachCartItem;
          }),
          totalQuantities: state.cart.totalQuantities - 1,
        };
      }

      state.totalPrice -= isItemInCart.price;
      state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, isItemInCart, 1);
      state.action = "update";
    },

    remove: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart = {
        ...state.cart,
        items: state.cart.items.filter((pItem) => {
          return !(
            pItem.id === action.payload.id &&
            compareArrays(pItem.attributes, action.payload.attributes)
          );
        }),
        totalQuantities: state.cart.totalQuantities - isItemInCart.quantity,
      };

      state.totalPrice -= isItemInCart.price * isItemInCart.quantity;
      state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, isItemInCart, isItemInCart.quantity);
      state.action = "delete";
    },

    // ✅ Add clearCart action
    clearCart: (state) => {
      state.cart = null;
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
      state.action = null;
    },

    // ✅ Add updateQuantity action
    updateQuantity: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      const itemIndex = state.cart.items.findIndex(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (itemIndex === -1) return;

      const item = state.cart.items[itemIndex];
      const quantityDiff = action.payload.quantity - item.quantity;

      state.cart.items[itemIndex] = {
        ...item,
        quantity: action.payload.quantity,
      };

      state.cart.totalQuantities += quantityDiff;
      state.totalPrice += item.price * quantityDiff;
      state.adjustedTotalPrice += calcAdjustedTotalPrice(0, item, quantityDiff);
      state.action = "update";
    },
  },
});

export const { addToCart, removeCartItem, remove, clearCart, updateQuantity } = cartsSlice.actions;

export default cartsSlice.reducer;