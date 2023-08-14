import { CepRequestDto } from "../Address/CepRequestDto"

export class DisplayNannyServiceInformationDto {
    parentName: string = ''
    parentPictureBase64: string = ''
    parentCep: string = ''
    parentCellphone: string = ''
    parentEmail: string = ''
    serviceFinishHour: Date = new Date()
    parentBirthdayDate: Date = new Date()
    originCoordinates!: CepRequestDto
    destinationCoordinates!: CepRequestDto
    servicePrice!: number
    distance!: number
}