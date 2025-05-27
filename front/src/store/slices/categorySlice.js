import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL || '';
export const fetchcategories = createAsyncThunk(
    'categories/fetchcategories',
    async (id = null, thunkAPI) => {
        try {
            const endpoint = id ? `${url}categories?id=${id}` : `${url}categories`;
            const response = await axios.get(endpoint);
            const data = response.data?.data;
            return id ? data?.data?.[0] || null : data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        single: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearcategories: (state) => {
            state.data = [];
            state.single = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchcategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchcategories.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.data = action.payload;
                } else {
                    state.single = action.payload;
                }
            })
            .addCase(fetchcategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch categories';
            });
    }
});

export const { clearcategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
