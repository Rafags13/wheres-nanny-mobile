import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.2.2:22325/api/v1/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const apiViaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default api;