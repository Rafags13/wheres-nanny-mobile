export class NannyContractDto {
    nannyId!: number
    fullname!: string
    imageProfileBase64Uri!: string
    rankAverageStars!: number
    rankCommentCount!: number
    servicePrice!: number
    person!: { cellphone: string, email: string, name: string }
    address!: { cep: string, houseNumber: string, distanceBetweenThePeople: string }
}