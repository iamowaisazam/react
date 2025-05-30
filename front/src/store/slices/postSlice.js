import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../../data/post';
import axios from 'axios';
import api from '../../utils/apiClient';
const url = import.meta.env.VITE_API_URL || "";


export const fetchPosts = createAsyncThunk(
    'posts/fetchAll',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        return axios.get(`${url}posts`,{params:state.postState.filters})
        .then( response => response.data)
        .catch(( error) => thunkAPI.rejectWithValue(error.response.data))
    }
);


export const fetchPostById = createAsyncThunk(
    'posts/fetchById',
    async (id, thunkAPI) => {    
       return api.get('admin/posts/'+id).then(({data}) => {
            return data.data;
        }).catch((error) => {
            return thunkAPI.rejectWithValue(error.response.data)
        });
    }        
);



const postSlice = createSlice({
    name: 'posts',
    initialState: {
        postLoading:false,
        postError:'',
        post:null,
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
                
            })

            // 
            .addCase(fetchPostById.pending, (state, action) => {
                state.postLoading = true;
                state.post = null;
                state.postError = '';
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.post = action.payload;
                state.postLoading = false;
                state.postError = '';
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.postLoading = false;
                state.post = null;
                state.postError = 'Post Not Found';
            });

    },
});

export const selectPostById = (state, postId) => {
    return state.postState.posts.find(post => post._id === postId);
};

export const { setFilter, clearFilters } = postSlice.actions;
export default postSlice.reducer;
