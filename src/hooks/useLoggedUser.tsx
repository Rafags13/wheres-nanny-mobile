import { getCurrentUserAsync, getTokenAsync, logOutAsync, setTokenAsync } from "@storage/index";
import { useMemo } from "react";

export default function useLoggedUser() {
    const token = getTokenAsync();
    const currentUser = useMemo(() => getCurrentUserAsync(), [token])

    function setToken(token: string) {
        setTokenAsync(token);
    }

    function getToken() {
        return getTokenAsync();
    }

    async function logout() {
        await logOutAsync();
    }

    return { currentUser, setToken, getToken, logout };
}