import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import sliderReducer from './slices/sliderSlice';
import colorReducer from './slices/colorSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product:productReducer,
    slider:sliderReducer,
    color:colorReducer,
  },
});