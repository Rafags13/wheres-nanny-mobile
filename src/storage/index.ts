import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import { UserTokenDto } from '../assets/model/dto/User/UserTokenDto';
import { FavoritedNanny } from '../features/listNanny/favoriteListNannySlice';
import { LogoutRequest } from '../services/requests/AutenticationRequests';

export const storage = new MMKV({ id: 'WheresNanny' });

export function getToken() {
    const TOKEN = storage.getString('token') || ''
    return TOKEN;
}

export function getCurrentUser() {
    const TOKEN = getToken();
    const currentUser: UserTokenDto = TOKEN !== '' ? jwt_decode(TOKEN) : new UserTokenDto();

    return currentUser;
}

export function getAllNannies(): FavoritedNanny[] {
    const allNannies: FavoritedNanny[] = JSON.parse(storage.getString('favoritedNannies') as string || JSON.stringify([]));

    return allNannies;
}

export function addFavoriteNannyAsyncStorage(newNanny: FavoritedNanny): void {
    const allNannies = getAllNannies();
    allNannies.push(newNanny);
    storage.set('favoritedNannies', JSON.stringify(allNannies));
}

export function removeFavoriteNannyAsyncStorage(nannyId: number) {
    const allNannies = getAllNannies();
    const filteredNannies = allNannies.filter(nanny => nanny.id !== nannyId);
    storage.set('favoritedNannies', JSON.stringify(filteredNannies))
}

export async function logOut() {
    await LogoutRequest();
    storage.clearAll();
}