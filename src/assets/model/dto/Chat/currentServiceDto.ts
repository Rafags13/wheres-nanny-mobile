import { Message } from "./message"

export class CurrentServiceDto {
    serviceId?: number = 0
    waitingResponse: boolean = true
    messages: Message[] = []
}