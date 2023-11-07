import { getTokenAsync } from "@storage/index";
import api, { apiViaCep } from "./api";

export async function getData(route: string, params?: {}) {
    api.defaults.headers.common["Authorization"] = `Bearer ${getTokenAsync()}`;
    return await api.get(route, params);
}

export async function postData(route: string, body?: any, params?: any) {
    api.defaults.headers.common["Authorization"] = `Bearer ${getTokenAsync()}`;
    return await api.post(route, JSON.stringify(body), {params: params});
}

export async function postDataAnonymous(route: string, body: any) {
    delete api.defaults.headers.common['Authorization'];
    return await api.post(route, JSON.stringify(body));
}

export async function updateData(route: string, body: any) {
    api.defaults.headers.common["Authorization"] = `Bearer ${getTokenAsync()}`;
    return await api.put(route, JSON.stringify(body));
}

export async function viaCepRequestGetByCep(cep: string) {
    return await apiViaCep.get(`${cep}/json`);
}