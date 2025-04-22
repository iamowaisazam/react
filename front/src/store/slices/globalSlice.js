import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: false,
    showLoginModal: false,
    showResModal: false,
    showForgetModal: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setModalState: (state, action) => {
            const { modal, value } = action.payload;


            state.showLoginModal = false;
            state.showResModal = false;
            state.showForgetModal = false;


            if (value === true && modal in state) {
                state[modal] = true;
            }
        }
    },
});

export const { toggleMenu, setModalState } = uiSlice.actions;

export default uiSlice.reducer;
