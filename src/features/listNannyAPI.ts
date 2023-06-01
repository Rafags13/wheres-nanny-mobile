import { ChangeNannyListByFilterDto } from "../dto/Person/ChangeNannyListByFilterDto";
import { FindCommonUserServicesDto } from "../dto/Person/FindCommonUserServicesDto";
import { postData } from "../services/apiRequests";
import { getCurrentUser } from "../storage";

export async function fetchUserHomeInformation() {
    const currentUser = getCurrentUser();
    const request = await postData('Person/GetUserHomeInformation', new FindCommonUserServicesDto(currentUser?.id, currentUser?.cep));
    return request;
}

export async function fetchNannyListByFilter(filter: string) {
    const currentuser = getCurrentUser();
    const request = await postData('Person/ChangeNannyListByFilter', new ChangeNannyListByFilterDto(currentuser?.cep, filter))
    return request;
}