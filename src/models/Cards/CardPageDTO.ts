import { CardDTO } from "./CardDTO"

export interface CardPageDTO {
    curr_page: number,
    total_pages: number,
    results: number,
    card_DTOs: CardDTO[],
}