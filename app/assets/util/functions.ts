export function ConvertDateBrazilFormatToDateType(date: string): Date {
    const dateSplitted = date.split('/');
    const convertedDate = new Date(Number(dateSplitted[2]), Number(dateSplitted[1]) - 1, Number(dateSplitted[0]));
    return convertedDate;
}