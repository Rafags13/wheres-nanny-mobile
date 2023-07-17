import { CreateContractNannyDto } from "@dtos/Nanny/CreateContractNannyDto";
import { getCurrentUser } from "@storage/index";
import { getData, postData } from "@services/apiRequests";

export async function hireNanny(createContractNanny: CreateContractNannyDto) {
    return await postData('Service/Create', createContractNanny);
}

export async function getAllServices(page: number) {
    const currentUser = getCurrentUser();
    return await getData(`Service/GetAll/${currentUser.id}/${page}`)
}