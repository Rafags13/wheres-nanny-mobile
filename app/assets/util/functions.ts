import { Alert } from "react-native";
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";

export function ConvertDateBrazilFormatToDateType(date: string): Date {
    const dateSplitted = date.split('/');
    const convertedDate = new Date(Number(dateSplitted[2]), Number(dateSplitted[1]) - 1, Number(dateSplitted[0]));
    return convertedDate;
}

function photoIsValid(result: ImagePickerResponse) {
    if (result.didCancel) {
        Alert.alert('Seleção de imagem cancelada');
        return false;
    }

    if (result.assets?.length as number > 1) {
        Alert.alert('Selecione apenas uma imagem');
        return false;
    }

    return true;
}

export async function getPhotoByBase64() {
    const options: ImageLibraryOptions = {
        mediaType: "photo",
        includeBase64: true
    }
    const result = await launchImageLibrary(options);

    if (!photoIsValid(result)) return;

    const base64Uri = result.assets?.find((asset, index) => index === 0)?.base64 as string;

    return base64Uri;
}

export function isNullOrUndefinedOrEmpty(value: string) {
    return value === null || value === undefined || value === ''
}

export function removeAllSpecialCharacters(value: string) {
    const newString = value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    return newString;
}

export function removeSpaces(value: string) {
    const newString = value.replace(/\s/g, '');

    return newString;
}