import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL || '';

export const fetchversions = createAsyncThunk(
    'versions/fetchversions',
    async (id = null, thunkAPI) => {
        try {
            const endpoint = id ? `${url}versions?id=${id}` : `${url}versions`;
            const response = await axios.get(endpoint);
            const data = response.data?.data;
            return id ? data?.data?.[0] || null : data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const versionSlice = createSlice({
    name: 'versions',
    initialState: {
        data: [],
        single: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearVersions: (state) => {
            state.data = [];
            state.single = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchversions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchversions.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.data = action.payload;
                } else {
                    state.single = action.payload;
                }
            })
            .addCase(fetchversions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch versions';
            });
    }
});

export const { clearVersions } = versionSlice.actions;
export default versionSlice.reducer;
