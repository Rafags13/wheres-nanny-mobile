import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.0.13:22325/api/v1/',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const apiViaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default api;