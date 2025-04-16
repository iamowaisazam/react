// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

import product from '../../data/produts';
import colors from '../../data/colors';

const initialState = {
  value: 0,
  count:0,
  data:[],
  colors: colors, 

  filters:{
    model:'',
    type:'',
    color:'',
    brand:'',
    category:'',
  }
};

export const productSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {

    setFilter: (state,action) => {

      const {filter,value} = action.payload;
      state.filters[filter] = value;
      
    },

    searchCar: (state,action) => {

          let cars = [];

          product.forEach(item => {

              if(state.filters.color != ''){
                if(item.color_id != state.filters.color){
                  return false;
                }
              }

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

export const { setFilter,searchCar} = productSlice.actions;
export default productSlice.reducer;