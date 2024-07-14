import { CardConditionOwnedDTO } from "../../models/MyCards/CardConditionsOwnedDTO";
import { CardOwnedResponseDTO } from "../../models/MyCards/CardOwnedResponseDTO";
import Cookies from "js-cookie";

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

const getConditionsOwned = async (cardId: number) => {
    try {
        const url = "https://localhost:44321/api/user/cards/conditions/" + cardId;
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const conditions = await response.json() as CardConditionOwnedDTO[];
        return conditions;
    } catch (error) {
        console.error('Error fetching conditions', error);
        throw error;
    }
}

const addCardOwned = async (cardOwned: CardConditionOwnedDTO) => {
    try {
        const url = "https://localhost:44321/api/user/cards/";
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cardOwned)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error adding card owned:', error);
        throw error;
    }
}

const updateCardOwned = async (cardOwned: CardConditionOwnedDTO) => {
    try {
        const url = "https://localhost:44321/api/user/cards/";
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cardOwned)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error updating card owned:', error);
        throw error;
    }
}

const deleteCardOwned = async (id: number) => {
    try {
        const url = "https://localhost:44321/api/user/cards/" + id;
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error deleting card owned:', error);
        throw error;
    }
}

export { getCardsOwned, getConditionsOwned };