import { CardConditionDTO } from "./CardConditionDTO";
import { CardDTO } from "./CardDTO";

export interface CardDetailedDTO {
    card: CardDTO,
    cardConditions: CardConditionDTO[]
}