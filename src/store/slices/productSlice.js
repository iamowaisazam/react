// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

import product from '../../data/produts';


const initialState = {
  value: 0,
  count:0,
  data:product 
};

export const productSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {


  },

});

export const { } = productSlice.actions;
export default productSlice.reducer;