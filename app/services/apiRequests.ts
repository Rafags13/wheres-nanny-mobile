import api from "./api";

export async function getData(route: string, params?: {}) {
    return await api.get(route, params);
}

export async function postData(route: string, params?: {}) {
    return await api.post(route, params);
}