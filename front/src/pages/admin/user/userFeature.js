import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  }
});

const buildQuery = (params) => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      query.append(key, params[key]);
    }
  }
  return query.toString();
};

export const getUsers = (data) => {
  const query = buildQuery(data);
  return axios.get(`${url}admin/users?${query}`);
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
