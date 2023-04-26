import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:22325/api/v1/',
    headers: { "Content-Type": "application/json" }
})

export default api;