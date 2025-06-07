import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://lhd9n7-8081.csb.app/api',
    withCredentials: true,
})