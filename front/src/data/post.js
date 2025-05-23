import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

export const getPost = async () => {
    const url = import.meta.env.VITE_API_URL || "";
    const response = await axios.get(`${url}posts`);
    return response.data.data.data;
};
