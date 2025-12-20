import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],      
  coupon: null,    
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    increaseQty(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else if (item && item.qty === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    applyCoupon(state, action) {
      const { code } = action.payload;

      if (code === "SAVE10") {
        state.coupon = { code, discountPercent: 10 };
      } else if (code === "SAVE20") {
        state.coupon = { code, discountPercent: 20 };
      } else {
        state.coupon = null;
      }
    },

    clearCoupon(state) {
      state.coupon = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
  clearCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
