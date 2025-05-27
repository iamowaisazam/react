import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL || '';

export const fetchModels = createAsyncThunk(
    'models/fetchModels',
    async (id = null, thunkAPI) => {
        try {
            const endpoint = id ? `${url}models?id=${id}` : `${url}models`;
            const response = await axios.get(endpoint);
            const data = response.data?.data;
            return id ? data?.data?.[0] || null : data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const modelSlice = createSlice({
    name: 'models',
    initialState: {
        data: [],
        single: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearModels: (state) => {
            state.data = [];
            state.single = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchModels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.data = action.payload;
                } else {
                    state.single = action.payload;
                }
            })
            .addCase(fetchModels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch models';
            });
    }
});

export const { clearModels } = modelSlice.actions;
export default modelSlice.reducer;
