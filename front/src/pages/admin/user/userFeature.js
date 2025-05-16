import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  }
});



export const getUsers = (data) => {
  return axios.get(`${url}admin/users`, { params: data });
};

export const getSingleUser = (id) => {
  return axios.get(`${url}admin/user/${id}`);
};

export const createUser = (data) => {
  return api.post("admin/users/create", data);
};

export const editUser = (id, data) => {

  return api.put(`admin/user/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`admin/user/${id}`);
};

export default {
  getUsers,
  createUser,
  deleteUser,
  getSingleUser,
  editUser,
};
