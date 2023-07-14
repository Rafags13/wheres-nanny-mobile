import { RegisterUserDto } from "./RegisterUserDto";

export class RegisterNannyDto {
    servicePrice!: number
    userDataToRegister!: RegisterUserDto
    base64CriminalRecord: string = ''
    base64ProofOfAddress: string = ''
}