import { CardConditionDTO } from "./CardConditionDTO";

export interface CardDTO {
    id: number,
    editionName: string,
    editionCode: string,
    rarity: number,
    name: string,
    imageURL: string,
    cardConditions: CardConditionDTO[],
    isFoil: boolean,
    nmPrice: number
}