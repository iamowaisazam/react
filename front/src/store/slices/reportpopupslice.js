import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isReportPopupOpen: false,
};

const reportPopupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openReportPopup: (state) => {
            console.log("hello");
            state.isReportPopupOpen = true;
        },
        closeReportPopup: (state) => {
            state.isReportPopupOpen = false;
        },
    },
});

export const { openReportPopup, closeReportPopup } = reportPopupSlice.actions;

export default reportPopupSlice.reducer;
