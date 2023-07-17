import { LoginDto } from "@dtos/User/LoginDto";
import { getCurrentUser } from "@storage/index";
import { postData, postDataAnonymous } from "@services/apiRequests";

export async function LoginRequest(loginDto: LoginDto) {
    return await postDataAnonymous('Login', loginDto);
}

export async function LogoutRequest() {
    const currentUser = getCurrentUser();
    return await postData('Logout', currentUser.id);
}