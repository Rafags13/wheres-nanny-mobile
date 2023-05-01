export class RegisterUserDto {
    fullname: string = ''
    username: string = ''
    email: string = ''
    password: string = ''
    cellphone: string = ''
    birthdayDate!: Date
    cpf: string = ''
    isNanny: boolean = false
    cep: string = ''
    houseNumber: string = ''
    complement: string = ''
}