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
        openLoginModal: (state) => {
            state.showLoginModal = true;
        },
        closeLoginModal: (state) => {
            state.showLoginModal = false;
        },
        openResModal: (state) => {
            state.showResModal = true;
        },
        closeResModal: (state) => {
            state.showResModal = false;
        },
        openForgotModal: (state) => {

            state.showForgotModal = true;
            // state.showLoginModal = false;
        },
        closeForgotModal: (state) => {
            state.showForgotModal = false;
        },
    },
});

export const {
    toggleMenu,
    openLoginModal,
    closeLoginModal,
    openResModal,
    closeResModal,
    openForgotModal,
    closeForgotModal
} = uiSlice.actions;

export default uiSlice.reducer;
