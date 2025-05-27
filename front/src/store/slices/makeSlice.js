import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL || '';
export const fetchMakes = createAsyncThunk(
    'makes/fetchMakes',
    async (id = null, thunkAPI) => {
        try {
            const endpoint = id ? `${url}makes?id=${id}` : `${url}makes`;
            const response = await axios.get(endpoint);
            const data = response.data?.data;
            return id ? data?.data?.[0] || null : data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const makesSlice = createSlice({
    name: 'makes',
    initialState: {
        data: [],
        single: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearMakes: (state) => {
            state.data = [];
            state.single = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMakes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMakes.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.data = action.payload;
                } else {
                    state.single = action.payload;
                }
            })
            .addCase(fetchMakes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch makes';
            });
    }
});

export const { clearMakes } = makesSlice.actions;
export default makesSlice.reducer;
