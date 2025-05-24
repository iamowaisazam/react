import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../../data/post';

export const fetchPosts = createAsyncThunk(
    'posts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await getPost();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchPostById = createAsyncThunk(
    'posts/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await getPost(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
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
    reducers: {},
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
            })

            .addCase(fetchPostById.fulfilled, (state, action) => {
                const post = action.payload;
                const exists = state.posts.find(p => p._id === post?._id);
                if (!exists && post) {
                    state.posts.push(post);
                }
            })
    }
});

export const selectPostById = (state, postId) => {
    return state.postState.posts.find(post => post._id === postId);
};

export default postSlice.reducer;
