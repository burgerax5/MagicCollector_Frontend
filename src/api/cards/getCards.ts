import { CardPageDTO } from "../../models/Cards/CardPageDTO";
import apiURL from "../config";

const getCardsInPage = async (params: string) => {
    const url = apiURL + '/api/cards?' + params;
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const pageData = await response.json();
        return pageData as CardPageDTO;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }

}

export default getCardsInPage;