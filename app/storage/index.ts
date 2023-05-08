import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import { UserTokenDto } from '../dto/User/UserTokenDto';

export const storage = new MMKV({ id: 'WheresNanny' });

export const TOKEN = storage.getString('token');

export const USER: UserTokenDto = jwt_decode(TOKEN as string);