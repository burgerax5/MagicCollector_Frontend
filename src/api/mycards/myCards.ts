import { CardConditionOwnedDTO } from "../../models/UserCards/CardConditionsOwnedDTO";
import { CardOwnedResponseDTO } from "../../models/UserCards/CardOwnedResponseDTO";
import Cookies from "js-cookie";
import { CollectionDetailsDTO } from "../../models/UserCards/CollectionDetailsDTO";
import apiURL from "../config";

const getCardsOwned = async (username: string) => {
    try {
        const url = apiURL + "/api/user/cards/" + username;
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        const pageData = await response.json() as CardOwnedResponseDTO;
        return pageData;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}

const getConditionsOwned = async (cardId: number) => {
    try {
        const url = apiURL + "/api/user/cards/conditions/" + cardId;
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        const conditions = await response.json() as CardConditionOwnedDTO[];
        return conditions;
    } catch (error) {
        console.error('Error fetching conditions', error);
        throw error;
    }
}

const addCardOwned = async (cardOwned: CardConditionOwnedDTO) => {
    try {
        const url = apiURL + "/api/user/cards/";
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(cardOwned)
        });

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        return true;
    } catch (error) {
        console.error('Error adding card owned:', error);
        throw error;
    }
}

const updateCardOwned = async (cardOwned: CardConditionOwnedDTO) => {
    try {
        const url = apiURL + "/api/user/cards/" + cardOwned.id;
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(cardOwned)
        });

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        return true;
    } catch (error) {
        console.error('Error updating card owned:', error);
        throw error;
    }
}

const deleteCardOwned = async (id: number) => {
    try {
        const url = apiURL + "/api/user/cards/" + id;
        const token = Cookies.get("auth");

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        return true;
    } catch (error) {
        console.error('Error deleting card owned:', error);
        throw error;
    }
}

const getCollectionDetails = async (username: string) => {
    try {
        const url = apiURL + `/api/user/cards/${username}/details `;
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`HTTP Error. Status: ${response.status}`);

        const details = await response.json() as CollectionDetailsDTO;
        return details;
    } catch (error) {
        console.error(`Error getting ${username}'s collection details: `, error);
        throw error;
    }
}

export { getCardsOwned, getConditionsOwned, addCardOwned, updateCardOwned, deleteCardOwned, getCollectionDetails };