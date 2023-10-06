import { CepRequestDto } from "../Address/CepRequestDto"

export class DisplayServiceInformationDto {
    name: string = ''
    pictureBase64: string = ''
    cep: string = ''
    cellphone: string = ''
    email: string = ''
    serviceFinishHour: Date = new Date()
    birthdayDate: Date = new Date()
    originCoordinates!: CepRequestDto
    destinationCoordinates!: CepRequestDto
    servicePrice!: number
    distance!: number
}