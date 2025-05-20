import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});



export const getVersions = (data) => {
    return axios.get(`${url}admin/versions`, { params: data });
};

export const getSingleVersions = (id) => {
    return axios.get(`${url}admin/versions/${id}`);
};

export const createVersions = (data) => {
    return api.post("admin/versions/create", data);
};

export const editVersions = (id, data) => {

    return api.put(`admin/versions/${id}`, data);
};

export const deleteVersions = (id) => {
    return api.delete(`admin/versions/${id}`);
};

export default {
    getVersions,
    getSingleVersions,
    createVersions,
    editVersions,
    deleteVersions,
};
