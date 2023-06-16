import axios from "axios";
import api, { apiViaCep } from "./api";

export async function getData(route: string, params?: {}) {
    return await api.get(route, params);
}

export async function postData(route: string, body: any) {
    return await api.post(route, JSON.stringify(body));
}

export async function viaCepRequestGetByCep(cep: string) {
    return await apiViaCep.get(`${cep}/json`);
    // return await axios.get(`viacep.com.br/ws/${cep}/json/`);
}