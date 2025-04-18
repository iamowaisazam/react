// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

import product from '../../data/produts';
import colors from '../../data/colors';

const initialState = {
  value: 0,
  count: 0,
  data: [],
  full: product,
  colors: colors,

  filters: {
    model: '',
    type: '',
    color: '',
    brand: '',
    category: '',
    make: '',
    door: '',
    fuel: '',
    driver_type: '',
    version: '',
    transmission: '',
    cylinder: '',
    minrange: 0,
    maxrange: 50000000,
  }
};

export const productSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {

    setFilter: (state, action) => {

      const { filter, value } = action.payload;
      state.filters[filter] = value;

    },

    searchCar: (state, action) => {

      let cars = [];

      product.forEach(item => {

        if (state.filters.color != '') {
          if (item.color_id != state.filters.color) {
            return false;
          }
        }
        if (state.filters.brand != '') {
          if (item.brand != state.filters.brand) {
            return false;
          }
        }
        if (state.filters.model != '') {
          if (item.model_id != state.filters.model) {
            return false;
          }
        }
        if (state.filters.category != "") {
          if (item.category_id != state.filters.category) {
            return false;
          }
        }
        if (state.filters.fuel != "") {
          if (item.fuel_id != state.filters.fuel) {
            return false;
          }
        }
        if (state.filters.cylinder != "") {
          if (item.cylinder_id != state.filters.cylinder) {
            return false;
          }
        }
        if (state.filters.door != "") {
          if (item.door != state.filters.door) {
            return false;
          }
        }
        if (state.filters.driver_type != "") {
          if (item.driver_type != state.filters.driver_type) {
            return false;
          }
        }
        if (state.filters.make != "") {
          if (item.make != state.filters.make) {
            return false;
          }
        }
        if (state.filters.transmission != "") {
          if (item.transmission != state.filters.transmission) {
            return false;
          }
        }
        if (state.filters.version != "") {
          if (item.version_id != state.filters.version) {
            return false;
          }
        }
        if (state.filters.minrange && item.price < state.filters.minrange) return false;
        if (state.filters.maxrange && item.price > state.filters.maxrange) return false;


        cars.push(item);
      });


      state.data = cars;

    },


  },

});

export const selectColorNameById = (state, colorId) => {
  const match = state.product.colors.find((c) => c.id === colorId);
  return match ? match.name : 'Unknown';
};

export const { setFilter, searchCar } = productSlice.actions;
export default productSlice.reducer;