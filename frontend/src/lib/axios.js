import axios from 'axios';
export const axiosInstanace=axios.create({
    baseURL: import.meta.env.MODE==="development"?"http://localhost:8080/api":"/api",
    withCredentials:true,
})