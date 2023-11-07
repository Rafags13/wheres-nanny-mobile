import { TypeOfUser } from "@enums/TypeOfUser";
import { getData, postData } from "@services/apiRequests";
import { getCurrentService, getCurrentUserAsync } from "@storage/index";

export async function GetServiceInformationsFromNanny(serviceId: number) {
    return await getData(`Service/GetServiceInformationsFromNanny/${serviceId}`);
}

export async function GetServiceInformationsFromPerson(serviceId: number) {
    return await getData(`Service/GetServiceInformationsFromPerson/${serviceId}`);
}

export async function CancelTheService(serviceId: number) {
    const isClient = getCurrentUserAsync().typeOfUser === TypeOfUser.CommonUser;
    console.log(isClient);
    return await postData(`Service/CancelService/${serviceId}`, null, {isClient: isClient});
}