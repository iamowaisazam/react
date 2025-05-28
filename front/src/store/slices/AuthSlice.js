import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../../data/post';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setModalState } from './globalSlice';
const url = import.meta.env.VITE_API_URL || "";


// ***
// Login
// ***


export const login = createAsyncThunk(
    'auth/login',
    async (_, thunkAPI) => {

         const state = thunkAPI.getState();

        return axios.post(`${url}login`,{
                email:state.auth.form.email,
                password:state.auth.form.password,
        })
        .then( async (response) => { 
            
            let data = response.data;
           await localStorage.setItem('token',data.data.user.token);
            toast.success("You Are Now Logged In");
            thunkAPI.dispatch(setModalState({ modal: 'showLoginModal', value: false }));

            return data;
        })
        .catch(( error) => { 
            
            if(error.response?.data?.message){
                toast.warning(error.response.data.message);
            }else{
                toast.warning('Something Went Wrong');
            }
            return thunkAPI.rejectWithValue(error.response.data)
        })
    }
);

// ***
// Register
// ***

export const register = createAsyncThunk(
    'auth/register',
    async (_, thunkAPI) => {

         const state = thunkAPI.getState();

        return axios.post(`${url}register`,{
                name:state.auth.form.name,
                email:state.auth.form.email,
                password:state.auth.form.password,
        })
        .then( async (response) => { 
            
            let data = response.data;
            
            thunkAPI.dispatch(setModalState({ modal: 'showRegisterModal', value: false }));
            thunkAPI.dispatch(setModalState({ modal: 'showLoginModal', value: true }));
            toast.success("Account Created Please Login");
            return data;
        })
        .catch(( error) => { 

            if(error.response?.data?.message){
                toast.warning(error.response.data.message);
            }else{
                toast.warning('Something Went Wrong');
            }

            return thunkAPI.rejectWithValue(error.response.data) 
        })
    }
);


// ***
// Register
// ***

export const getuser = createAsyncThunk(
    'auth/getuser',
    async (token = null, thunkAPI) => {

        return axios.get(`${url}profile/${token}`)
        .then( async (response) => { 
            let data = response.data;
            return data;
        })
        .catch(( error) => { 

            localStorage.removeItem('token');
            return thunkAPI.rejectWithValue(error.response.data) 
        })
    }
);


// ***
// Register
// ***

export const logout = createAsyncThunk(
    'auth/logout',
    async (token = null, thunkAPI) => {

          const state = thunkAPI.getState();

        return axios.get(`${url}logout/${state.auth.user.token}`)
        .then( async (response) => { 

            let data = response.data;
            localStorage.removeItem('token');
            console.log('Logout Success');
            
            return data;
        })
        .catch(( error) => { 
            
            localStorage.removeItem('token');
            return thunkAPI.rejectWithValue(error.response.data) 
        })
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoading: false,
        user:false,
        form:{
            name:'owais',
            email:'admin@gmail.com',
            password:'owais123',
        },
        errors:{},
        posts: [],
        loading: false,
    },
    reducers: {
        setForm: (state, action) => {
            const { name, value } = action.payload;
            state.form[name] = value;
        },
        clearForm: (state) => {

            state.errors = null;
            state.form = {
                name:'',
                email:'',
                password:'',
            };
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.errors = null;
                state.user = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.errors;
                state.user = false;
            })


            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.errors = null;
                state.user = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.errors;
                state.user = false;
            })



            //Auth 
            .addCase(getuser.pending, (state) => {
                state.authLoading = true;
                state.user = null;
            })
            .addCase(getuser.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.authLoading = false;
            })
            .addCase(getuser.rejected, (state, action) => {
                state.authLoading = false;
                state.user = null;
            })


            //Logout 
            .addCase(logout.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
                state.authLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.authLoading = false;
            })

            
    },
});


export const {setForm } = authSlice.actions;

export default authSlice.reducer;
