import { CardOwnedResponseDTO } from "../../models/MyCards/CardOwnedResponseDTO";

const getCardsOwned = async (username: string) => {
    try {
        const url = "https://localhost:44321/api/user/cards/" + username;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const pageData = await response.json() as CardOwnedResponseDTO;
        return pageData;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}

export { getCardsOwned };