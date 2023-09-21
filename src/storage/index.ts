import { MMKV } from 'react-native-mmkv';
import jwt_decode from "jwt-decode";
import { UserTokenDto } from '../assets/model/dto/User/UserTokenDto';
import { FavoritedNanny } from '../features/listNanny/favoriteListNannySlice';
import { LogoutRequest } from '../services/requests/AutenticationRequests';
import { CurrentServiceDto } from '@models/dto/Chat/currentServiceDto';
import { Message } from '@models/dto/Chat/message';

export const storage = new MMKV({ id: 'WheresNanny' });

export function setTokenAsync(token: string) {
    storage.set('token', token);
}

export function getTokenAsync() {
    const TOKEN = storage.getString('token') || ''
    return TOKEN;
}

export function getCurrentUserAsync() {
    const TOKEN = getTokenAsync();
    const currentUser: UserTokenDto = TOKEN !== '' ? jwt_decode(TOKEN) : new UserTokenDto();

    return currentUser;
}

export async function logOutAsync() {
    await LogoutRequest();
    storage.clearAll();
}

// TODO: Create a hook to nanny state

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

// TODO: Create a hook to service state

export function addCurrentServiceToAsync(currentService: CurrentServiceDto) {
    storage.set('currentService', JSON.stringify(currentService));
}

export function clearCurrentService() {
    storage.delete('currentService');
}

export function isInSomeService() {
    const currentServiceExists = storage.getString('currentService') as string;

    return currentServiceExists !== undefined;
}

export function getCurrentService() {
    const currentService: CurrentServiceDto = JSON.parse(storage.getString('currentService') as string || '');

    return currentService;
}

export function onNotWaitingNannyResponseAnymore() {
    const currentService: CurrentServiceDto = JSON.parse(storage.getString('currentService') as string || '');

    const newCurrentStatus: CurrentServiceDto = {
        ...currentService,
        waitingResponse: false,
    }

    storage.set('currentService', JSON.stringify(newCurrentStatus));
}

export function onServiceAccept(serviceId: number) {
    const currentService: CurrentServiceDto = JSON.parse(storage.getString('currentService') as string || '');

    const newCurrentServiceId: CurrentServiceDto = {
        ...currentService,
        serviceId
    }

    storage.set('currentService', JSON.stringify(newCurrentServiceId));
}

export function addNewMessage(message: Message) {
    const currentService = getCurrentService();

    currentService.messages?.push(message);

    storage.set('currentService', JSON.stringify(currentService));
}

export function getCurrentMessages() {
    const currentService = getCurrentService();
    return currentService.messages || [];
}