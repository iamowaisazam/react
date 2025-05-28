import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../../data/post';
import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";



export const fetchPosts = createAsyncThunk(
    'posts/fetchAll',
    async (_, thunkAPI) => {

            // const state = thunkAPI.getState();
            // const filters = state.postState.filters;
            // const params = new URLSearchParams();
            // if (filters.catId) params.append('catId', filters.catId);
            // if (filters.makeId) params.append('makeId', filters.makeId);
            // if (filters.modelId) params.append('modelId', filters.modelId);
            // if (filters.verId) params.append('verId', filters.verId);

            return axios.get(`${url}posts`)
            .then( response => response.data)
            .catch(( response) => response)
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
        error: null,
        filters: {
            catId: '',
            makeId: '',
            modelId: '',
            verId: '',
            year: '',
        },
    },
    reducers: {
        setFilter: (state, action) => {
            const { filter, value } = action.payload;
            state.filters[filter] = value;
        },
        clearFilters: (state) => {
            state.filters = {
                catId: '',
                makeId: '',
                modelId: '',
                verId: '',
                year: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.data.data;

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
            });
    },
});

export const selectPostById = (state, postId) => {
    return state.postState.posts.find(post => post._id === postId);
};

export const { setFilter, clearFilters } = postSlice.actions;
export default postSlice.reducer;
