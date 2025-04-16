import { createSlice } from '@reduxjs/toolkit';
import color from '../../data/colors';

const initialState = {
  data: color,
};

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {},
});


export const selectAllColors = (state) => state.color.data;

export default colorSlice.reducer;
