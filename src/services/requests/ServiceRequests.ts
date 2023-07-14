import { CreateContractNannyDto } from "../../assets/model/dto/Nanny/CreateContractNannyDto";
import { getCurrentUser } from "../../storage";
import { getData, postData } from "../apiRequests";

export async function hireNanny(createContractNanny: CreateContractNannyDto) {
    return await postData('Service/Create', createContractNanny);
}

export async function getAllServices(page: number) {
    const currentUser = getCurrentUser();
    return await getData(`Service/GetAll/${currentUser.id}/${page}`)
}