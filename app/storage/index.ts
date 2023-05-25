import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import { UserTokenDto } from '../dto/User/UserTokenDto';
import { useNavigation } from '@react-navigation/native';

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

export function logOut() {
    storage.clearAll();
}