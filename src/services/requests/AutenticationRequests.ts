import { LoginDto } from "../../assets/model/dto/User/LoginDto";
import { getCurrentUser } from "../../storage";
import { postData } from "../apiRequests";

export async function LoginRequest(loginDto: LoginDto) {
    return await postData('Login', loginDto);
}

export async function LogoutRequest() {
    const currentUser = getCurrentUser();
    return await postData('Logout', currentUser.id);
}