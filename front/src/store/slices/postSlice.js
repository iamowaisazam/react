import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../../data/post';


export const fetchPosts = createAsyncThunk(
    'admin/posts',
    async (_, thunkAPI) => {
        try {
            const response = await getPost();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default postSlice.reducer;
