// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

import product from '../../data/produts';
import colors from '../../data/colors';

const initialState = {
  value: 0,
  count:0,
  data:product,
  colors: colors, 
};

export const productSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {


  },

});

export const selectColorNameById = (state, colorId) => {
  const match = state.product.colors.find((c) => c.id === colorId);
  return match ? match.name : 'Unknown';
};

export const { } = productSlice.actions;
export default productSlice.reducer;