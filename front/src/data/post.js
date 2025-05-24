import axios from 'axios';
const url = import.meta.env.VITE_API_URL || "";

export const getPost = async (id = null) => {
    const endpoint = id ? `${url}posts?id=${id}` : `${url}posts`;
    const response = await axios.get(endpoint);

    const data = response.data?.data;

    if (id) {
        console.log(data?.data?.[0])
        return data?.data?.[0] || null;
    }

    // otherwise return whole array
    return data?.data || [];
};
