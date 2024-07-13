import { CardOwnedDTO } from "./CardOwnedDTO";

export interface CardOwnedResponseDTO {
    totalCardsOwned: number,
    estimatedValue: number,
    cardsOwned: CardOwnedDTO[]
}