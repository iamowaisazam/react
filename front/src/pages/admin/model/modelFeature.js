import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});


export const getAllMake = (data) => {
    return axios.get(`${url}admin/makes`, { params: data });
};


export const getModel = (data) => {
    return axios.get(`${url}admin/models`, { params: data });
};


export const getModelById = (id) => {
    return axios.get(`${url}admin/models/${id}`);
};

export const createModel = (data) => {
    return api.post("admin/models/create", data);
};

export const updateModel = (id, data) => {

    return api.put(`admin/models/${id}`, data);
};

export const deleteModel = (id) => {
    return api.delete(`admin/models/${id}`);
};

export default {
    getModel,
    createModel,
    deleteModel,
    getModelById,
    updateModel,
    getAllMake,
};
