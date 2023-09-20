import { getCurrentUserAsync, getTokenAsync, logOutAsync, setTokenAsync } from "@storage/index";

export default function useLoggedUser() {
    function getCurrentUser() {
        return getCurrentUserAsync();
    }

    function setToken(token: string) {
        setTokenAsync(token);
    }

    function getToken() {
        return getTokenAsync();
    }

    async function logout() {
        await logOutAsync();
    }

    return { getCurrentUser, setToken, getToken, logout };
}