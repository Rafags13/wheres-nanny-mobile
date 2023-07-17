import { TypeOfUser } from "@enums/TypeOfUser"

export class UserTokenDto {
    constructor() { }
    id!: number
    email: string = ""
    imageUri: string = ""
    username: string = ""
    cep: string = ""
    deviceId: string = ""
    typeOfUser!: TypeOfUser
}