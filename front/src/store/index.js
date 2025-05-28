import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import sliderReducer from './slices/sliderSlice';
import colorReducer from './slices/colorSlice';
import postSlice from './slices/postSlice';
import makesReducer from './slices/makeSlice';
import categoriesSlice from './slices/categorySlice';
import modelsSlice from './slices/modelSlice';
import versionReducer from './slices/versionSlice';
import uiReducer from './slices/globalSlice';
import popupReducer from './slices/reportpopupslice';
import AuthReducer from './slices/AuthSlice';
import { userApi } from '../features/usersApi';
import { categoryApi } from '../features/categoryApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    slider: sliderReducer,
    color: colorReducer,
    ui: uiReducer,
    postState: postSlice,
    makes: makesReducer,
    categories: categoriesSlice,
    models: modelsSlice,
    versions: versionReducer,
    popup: popupReducer,
    auth: AuthReducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(categoryApi.middleware),
});
