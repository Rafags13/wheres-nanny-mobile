import { NannyCardProps } from "@features/listNanny/NannyCardList/NannyCard"

export class DisplayInformationHomeUser {
    mostRecentService!: recentCardDto | null
    nannyListOrderedByFilter: NannyCardProps[] = []
}

export class recentCardDto {
    imageUri: string = ""
    serviceId!: number
    personName: string = ""
    date!: Date
}