// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import prodcut from '../../data/produts';

const initialState = {
  data: prodcut.filter((item) =>  item.is_featured == 1),
  active:2,
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {

    nextSlide: (state) => {
        const currentIndex = state.data.findIndex(item => item.id === state.active);
        const nextIndex = (currentIndex + 1) % state.data.length;
        state.active = state.data[nextIndex].id;
      },
    prevSlide: (state) => {
        const currentIndex = state.data.findIndex(item => item.id === state.active);
        const prevIndex = (currentIndex - 1 + state.data.length) % state.data.length;
        state.active = state.data[prevIndex].id;
      },
    goToSlide: (state, action) => {
        state.active = action.payload; // pass the id directly
    }

  },

});

export const { nextSlide, prevSlide,goToSlide} = sliderSlice.actions;
export default sliderSlice.reducer;


