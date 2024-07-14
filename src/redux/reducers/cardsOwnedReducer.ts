import { CardConditionOwnedDTO } from "../../models/MyCards/CardConditionsOwnedDTO";
import { CardOwnedAction } from "../actions/actions";
import { ADD_CARD_OWNED, DELETE_CARD_OWNED, RESET_CARDS_OWNED, UPDATE_CARD_OWNED } from "../actions/actionTypes";

const oldCardsOwned: CardConditionOwnedDTO[] = [];
const newCardsOwned: CardConditionOwnedDTO[] = [];

const initialState = {
    old: oldCardsOwned,
    new: newCardsOwned
};

const cardsOwnedReducer = (state = initialState, action: CardOwnedAction) => {
    const mode = action.payload ? action.payload.mode : 'old';

    switch (action.type) {
        case ADD_CARD_OWNED:
            if ('cardOwned' in action.payload)
                return { ...state, [mode]: [...state[mode], action.payload.cardOwned] }
            return state;

        case UPDATE_CARD_OWNED:
            if ('cardOwned' in action.payload) {
                const cardOwned = (action.payload.cardOwned);
                const condition = cardOwned.condition;
                return { ...state, [mode]: state[mode].map(co => co.condition === condition ? cardOwned : co) };
            }
            return state;

        case DELETE_CARD_OWNED:
            if ('condition' in action.payload) {
                const condition = action.payload.condition;
                return { ...state, [mode]: state[mode].filter(co => co.condition !== condition) };
            }
            return state;

        case RESET_CARDS_OWNED:
            return { old: [], new: [] };
        default:
            return state;
    }
};

export default cardsOwnedReducer;