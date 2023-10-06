import { getData } from "@services/apiRequests";
import { getCurrentService, getCurrentUser } from "@storage/index";

export async function GetServiceInformationsFromNanny(serviceId: number) {
    return await getData(`Service/GetServiceInformationsFromNanny/${serviceId}`);
}

export async function GetServiceInformationsFromPerson(serviceId: number) {
    return await getData(`Service/GetServiceInformationsFromPerson/${serviceId}`);
}