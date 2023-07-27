import { RegisterNannyDto } from "@dtos/User/RegisterNannyDto";
import { RegisterUserDto } from "@dtos/User/RegisterUserDto";
import { postData, postDataAnonymous } from "@services/apiRequests";

export async function registerUser(isNanny: boolean, currentUser: RegisterNannyDto | RegisterUserDto) {
    return await postDataAnonymous(`User/${isNanny ? 'RegisterNanny' : 'RegisterUser'}`, currentUser);
}