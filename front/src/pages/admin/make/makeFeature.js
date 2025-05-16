import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});



export const getMake = (data) => {
    return axios.get(`${url}admin/make`, { params: data });
};

export const getSingleMake = (id) => {
    return axios.get(`${url}admin/make/${id}`);
};

export const createMake = (data) => {
    return api.post("admin/make/create", data);
};

export const editMake = (id, data) => {

    return api.put(`admin/make/${id}`, data);
};

export const deleteMake = (id) => {
    return api.delete(`admin/make/${id}`);
};

export default {
    getMake,
    createMake,
    deleteMake,
    getSingleMake,
    editMake,
};
