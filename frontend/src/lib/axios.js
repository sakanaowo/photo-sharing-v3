import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://sck5zr-8081.csb.app/api',
    withCredentials: true,
})