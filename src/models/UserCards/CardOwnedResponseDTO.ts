import { CardPageDTO } from "../Cards/CardPageDTO";

export interface CardOwnedResponseDTO {
    totalCardsOwned: number,
    estimatedValue: number,
    cardPageDTO: CardPageDTO
}