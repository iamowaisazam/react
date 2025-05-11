import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = import.meta.env.VITE_API_URL || "";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'admin/categories',
        }),
        getCategory: builder.query({
            query: (id) => `admin/category/${id}`,
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: 'admin/categories/create',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),

        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `admin/category/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `admin/category/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
