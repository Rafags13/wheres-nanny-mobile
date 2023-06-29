import { ServiceNannyCardProps } from "../../components/ServiceNannyCard";

export class NannyDashboardInformationDto {
    lastService!: ServiceNannyCardProps
    countingServiceChart!: CountingChartDto[]
    earnCountingChart!: CountingChartDto[]
    monthNames!: string[]
}

class CountingChartDto {
    data!: number
}