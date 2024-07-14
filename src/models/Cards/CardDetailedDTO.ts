import { CardConditionDTO } from "./CardConditionDTO";
import { CardDTO } from "./CardDTO";

export interface CardDetailedDTO {
    cardDTO: CardDTO,
    cardConditions: CardConditionDTO[]
}