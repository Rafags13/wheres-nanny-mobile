export class ProfileUpdateDataDto {
    personInformation!: {
        id: number,
        fullname: string,
        cpf: string,
        email: string,
        cellphone: string,
        imageBase64: string
    }

    addressFromUpdateInformation!: {
        cep: string,
        bairro: string,
        logradouro: string
        cidade: string,
        estado: string,
        complement: string,
        number: string
    }
}