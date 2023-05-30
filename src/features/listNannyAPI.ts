import { FindCommonUserServicesDto } from "../dto/Person/FindCommonUserServicesDto";
import { postData } from "../services/apiRequests";
import { getCurrentUser } from "../storage";

export async function fetchUserHomeInformation() {
    const currentUser = getCurrentUser();
    const request = await postData('Person/GetUserHomeInformation', new FindCommonUserServicesDto(currentUser?.id, currentUser?.cep));
    return request;
}