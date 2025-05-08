import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import sliderReducer from './slices/sliderSlice';
import colorReducer from './slices/colorSlice';
import uiReducer from './slices/globalSlice';
import popupReducer from './slices/reportpopupslice';
import { userApi } from '../features/usersApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    slider: sliderReducer,
    color: colorReducer,
    ui: uiReducer,
    popup: popupReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
