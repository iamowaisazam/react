import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});



export const getPost = (data) => {
    return axios.get(`${url}admin/posts`, { params: data });
};

export const getSinglePost = (id) => {
    return axios.get(`${url}admin/posts/${id}`);
};

export const createPost = (data) => {
    return api.post("admin/posts/create", data);
};

export const editPost = (id, data) => {

    return api.put(`admin/posts/${id}`, data);
};

export const deletePost = (id) => {
    return api.delete(`admin/posts/${id}`);
};

export default {
    getPost,
    getSinglePost,
    createPost,
    editPost,
    deletePost,
};
