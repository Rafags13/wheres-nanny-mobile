import { Alert } from "react-native";
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import { RegisterNannyDto } from "../../dto/User/RegisterNannyDto";
import { RegisterUserDto } from "../../dto/User/RegisterUserDto";

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

    console.log(nameReplaced);
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