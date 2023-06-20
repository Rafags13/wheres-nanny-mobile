import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import { UserTokenDto } from '../dto/User/UserTokenDto';
import { useNavigation } from '@react-navigation/native';
import { NannyCardProps } from '../features/listNanny/NannyCardList/NannyCard';
import { FavoritedNanny } from '../features/favoriteListNannySlice';

export const storage = new MMKV({ id: 'WheresNanny' });
storage.set('favoritedNannies', JSON.stringify([]));

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
    const allNannies: FavoritedNanny[] = JSON.parse(storage.getString('favoritedNannies') as string);

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

export function logOut() {
    storage.clearAll();
}