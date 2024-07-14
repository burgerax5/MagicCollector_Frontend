import { CardConditionOwnedDTO } from "../../models/MyCards/CardConditionsOwnedDTO";
import { CardOwnedAction } from "../actions/actions";
import { ADD_CARD_OWNED, DELETE_CARD_OWNED, UPDATE_CARD_OWNED } from "../actions/actionTypes";

const initialState: CardConditionOwnedDTO[] = [];

const cardsOwnedReducer = (state = initialState, action: CardOwnedAction) => {
    switch (action.type) {
        case ADD_CARD_OWNED:
            return [...state, action.payload as CardConditionOwnedDTO]
        case UPDATE_CARD_OWNED:
            const cardOwned = (action.payload as CardConditionOwnedDTO)
            const condition = cardOwned.condition
            return state.map(co => co.condition === condition ? cardOwned : co);
        case DELETE_CARD_OWNED:
            return state.filter(co => co.condition !== action.payload as string);
        default:
            return state;
    }
};

export default cardsOwnedReducer;