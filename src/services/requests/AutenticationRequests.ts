import { LoginDto } from "@dtos/User/LoginDto";
import { getCurrentUserAsync } from "@storage/index";
import { postData, postDataAnonymous } from "@services/apiRequests";

export async function LoginRequest(loginDto: LoginDto) {
    return await postDataAnonymous('Login', loginDto);
}

export async function LogoutRequest() {
    const currentUser = getCurrentUserAsync();
    return await postData('Logout', currentUser.id);
}