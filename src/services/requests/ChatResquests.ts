import { getData } from "@services/apiRequests";

export async function GetServiceInformationsFromNanny(serviceId: number) {
    return await getData(`Service/GetServiceInformationsFromNanny/${serviceId}`);
}