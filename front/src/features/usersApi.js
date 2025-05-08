import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const url = import.meta.env.VITE_API_URL || "";


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'admin/users',
        }),
    }),
});

export const { useGetUsersQuery } = userApi;
