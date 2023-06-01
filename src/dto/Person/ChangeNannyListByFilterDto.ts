export class ChangeNannyListByFilterDto {
    cep: string = ''
    filter: string = ''

    constructor(cep: string, filter: string) {
        this.cep = cep;
        this.filter = filter;
    }
}