import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});


export const getAllMake = (data) => {
    return axios.get(`${url}admin/make`, { params: data });
};


export const getModel = (data) => {
    return axios.get(`${url}admin/model`, { params: data });
};


export const getModelById = (id) => {
    return axios.get(`${url}admin/model/${id}`);
};

export const createModel = (data) => {
    return api.post("admin/model/create", data);
};

export const updateModel = (id, data) => {

    return api.put(`admin/model/${id}`, data);
};

export const deleteModel = (id) => {
    return api.delete(`admin/model/${id}`);
};

export default {
    getModel,
    createModel,
    deleteModel,
    getModelById,
    updateModel,
    getAllMake,
};
