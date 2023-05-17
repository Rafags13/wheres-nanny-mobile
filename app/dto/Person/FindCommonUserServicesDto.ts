export class FindCommonUserServicesDto {
    public personId: number = 0
    public cep: string = ''

    constructor(personId: number, cep: string) {
        this.personId = personId;
        this.cep = cep;
    }
}