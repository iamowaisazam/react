import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});



export const getCategories = (data) => {
    return axios.get(`${url}admin/categories`, { params: data });
};

export const getSingleCategory = (id) => {
    return axios.get(`${url}admin/category/${id}`);
};

export const createCategories = (data) => {
    return api.post("admin/categories/create", data);
};

export const editCategory = (id, data) => {

    return api.put(`admin/category/${id}`, data);
};

export const deleteCategories = (id) => {
    return api.delete(`admin/category/${id}`);
};

export default {
    getCategories,
    createCategories,
    deleteCategories,
    getSingleCategory,
    editCategory,
};
