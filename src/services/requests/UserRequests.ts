import { RegisterNannyDto } from "../../dto/User/RegisterNannyDto";
import { RegisterUserDto } from "../../dto/User/RegisterUserDto";
import { postData } from "../apiRequests";

export async function registerUser(isNanny: boolean, currentUser: RegisterNannyDto | RegisterUserDto) {
    return await postData(`User/${isNanny ? 'RegisterNanny' : 'RegisterUser'}`, currentUser);
}