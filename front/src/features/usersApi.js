import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = import.meta.env.VITE_API_URL || "";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'admin/users',
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `admin/user/${id}`,
                method: 'DELETE',
            }),
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: 'admin/users/create',
                method: 'POST',
                body: userData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation } = userApi;

