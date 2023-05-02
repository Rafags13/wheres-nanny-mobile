import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'WheresNanny' });

export const TOKEN = storage.getString('token');