import { AcceptedServiceDto } from "@dtos/Person/AcceptedServiceDto";
import { getCurrentUserAsync } from "@storage/index";
import { getData, postData } from "@services/apiRequests";

export async function getDashboardInformation() {
    const currentUser = getCurrentUserAsync();
    return await getData(`Nanny/GetDashboardInformation/${currentUser.id}`)
}

export async function getAllServicesFromCurrentNanny(paginationPage: number) {
    const currentUser = getCurrentUserAsync();

    return await getData(`Nanny/GetAllServices/${currentUser.id}/${paginationPage}`);
}

export async function getNannyById(nannyId: number) {
    const currentUser = getCurrentUserAsync();

    return await getData(`Person/GetNannyById/${nannyId}/${currentUser.id}`);
}

export async function getNannyServiceInformation(serviceId: number) {
    return await getData(`Service/GetNannyServiceInformation/${serviceId}`);
}

export async function acceptService(acceptedServiceDto: AcceptedServiceDto) {
    return await postData('Service/ServiceHasBeenAcceptedByNanny', acceptedServiceDto)
}