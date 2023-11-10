import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import { RegisterNannyDto } from "@dtos/User/RegisterNannyDto";
import { RegisterUserDto } from "@dtos/User/RegisterUserDto";
import { TypeOfUser } from "@enums/TypeOfUser";
import { perPlatformTypes, SupportedPlatforms } from "react-native-document-picker/lib/typescript/fileTypes";
import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { Platform } from "react-native";

export function ConvertDateBrazilFormatToDateType(date: string): Date {
    const dateSplitted = date.split('/');
    const convertedDate = new Date(Number(dateSplitted[2]), Number(dateSplitted[1]) - 1, Number(dateSplitted[0]));
    return convertedDate;
}

function photoIsValid(result: ImagePickerResponse) {
    if (result.didCancel) {
        return 'Seleção de imagem cancelada';
    }

    if (result.assets?.length as number > 1) {
        return 'Selecione apenas uma imagem';
    }

    return '';
}

export async function getPhotoByBase64() {
    const options: ImageLibraryOptions = {
        mediaType: "photo",
        includeBase64: true
    }
    const result = await launchImageLibrary(options);

    const errorMessage = photoIsValid(result);
    if (errorMessage !== '') {
        throw new Error(errorMessage);
    };

    const base64Uri = result.assets?.find((asset, index) => index === 0)?.base64 as string;

    return base64Uri;
}

export async function getDocumentByBase64() {
    const isAndroid = Platform.OS === 'android';
    var options: DocumentPickerOptions<SupportedPlatforms> = {
        copyTo: 'documentDirectory',
        type: isAndroid ? DocumentPicker.perPlatformTypes.android.pdf : DocumentPicker.perPlatformTypes.ios.pdf
    }
    return DocumentPicker.pickSingle(options);
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

export async function base64File(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
    });
}

export function replacePdfExtensioNames(name: string) {

    let nameReplaced = name.replace('.pdf', '');

    return nameReplaced;
}

export function createModelRegisterCommonUser(data: any): RegisterUserDto {
    const date = ConvertDateBrazilFormatToDateType(data.birthdayDate);
    const registerUserDto: RegisterUserDto = {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
        cellphone: removeSpaces(removeAllSpecialCharacters(data.cellphone)),
        birthdayDate: date,
        cpf: removeAllSpecialCharacters(data.cpf),
        imageUri: data.photo,
        cep: removeAllSpecialCharacters(data.cep),
        houseNumber: data.number,
        complement: data.complement
    }

    return registerUserDto;
}

export function createModelRegisterNanny(data: any): RegisterNannyDto {
    const registerUserDto = createModelRegisterCommonUser(data);
    const registerNannyDto: RegisterNannyDto = {
        userDataToRegister: registerUserDto,
        base64CriminalRecord: data.criminalRecord,
        base64ProofOfAddress: data.proofOfAddress,
        servicePrice: Number(data.servicePrice)
    }

    return registerNannyDto;
}

export function formatCellphoneNumber(cellphone: string) {
    const formatedCellphone = cellphone.toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4");

    return formatedCellphone;
}

export function formatCpf(cpf: string) {
    const formatedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return formatedCpf;
}

export function formatCep(cep: string) {
    if (!cep) return ""
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
    return cep;
}

export function removeSpecialCharacter(value: string) {
    return value.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export function returnRouteNameByProfileType(type: TypeOfUser): { mainContainer: string, screen: string } {
    const routeNameByProfileType: EnumDictionary<TypeOfUser, { mainContainer: string, screen: string }> = {
        [TypeOfUser.CommonUser]: { mainContainer: 'commonUser', screen: 'homeDerivatedPages' },
        [TypeOfUser.Nanny]: { mainContainer: 'nannyUser', screen: 'dashboard' },
        [TypeOfUser.Admin]: { mainContainer: '', screen: '' },
    }

    return routeNameByProfileType[type];
}

export function aliasToDistance(distance: number): string {
    const oneKilometer = 1000;
    const truncatedDistance = Math.trunc(distance);

    if (truncatedDistance > oneKilometer) {
        return `${truncatedDistance} km`;
    }

    return `${truncatedDistance} m`
}

export const formatCurrency = (amount: number) => {
    const CURRENCY_FORMAT = 'R$ ';
    const formatedNumber = String(amount).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    return CURRENCY_FORMAT + formatedNumber;
}

export function capitalize(str: string): string {
    var newString = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);

    return newString;
}