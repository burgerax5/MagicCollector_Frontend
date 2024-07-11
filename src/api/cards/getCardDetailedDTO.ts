import { CardDetailedDTO } from "../../models/Cards/CardDetailedDTO";

const getCardDetailedDTO = async (cardId: number) => {
    const url = "https://localhost:44321/api/cards/" + cardId;
    const cardDetailedDTO = await fetch(url).
        then(response => response.json()) as CardDetailedDTO;
    return cardDetailedDTO;
}

export default getCardDetailedDTO;