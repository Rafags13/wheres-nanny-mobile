export class ProfileUpdateDataDto {
    personInformation!: {
        fullname: string,
        cpf: string,
        email: string,
        cellphone: string
    }

    addressFromUpdateInformation!: {
        cep: string,
        bairro: string,
        logradouro: string,
        cidade: string,
        estado: string,
        complement: string,
        number: string
    }
}