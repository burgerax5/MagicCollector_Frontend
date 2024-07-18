import { CardDetailedDTO } from "../../models/Cards/CardDetailedDTO";
import apiURL from "../config";

const getCardDetailedDTO = async (cardId: number) => {
    const url = apiURL + "/api/cards/" + cardId;
    const cardDetailedDTO = await fetch(url).
        then(response => response.json()) as CardDetailedDTO;
    return cardDetailedDTO;
}

export default getCardDetailedDTO;