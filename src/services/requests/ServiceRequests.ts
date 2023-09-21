import { CreateContractNannyDto } from "@dtos/Nanny/CreateContractNannyDto";
import { getCurrentUserAsync } from "@storage/index";
import { getData, postData } from "@services/apiRequests";

export async function hireNanny(createContractNanny: CreateContractNannyDto) {
    return await postData('Service/Create', createContractNanny);
}

export async function getAllServices(page: number) {
    const currentUser = getCurrentUserAsync();
    return await getData(`Service/GetAll/${currentUser.id}/${page}`)
}