import { CardPageDTO } from "../../models/Cards/CardPageDTO";

const getCardsInPage = async (params: string) => {
    const url = 'https://localhost:44321/api/cards?' + params;
    const page = await fetch(url)
        .then(response => response.json()) as CardPageDTO;
    return page;
}

export default getCardsInPage;