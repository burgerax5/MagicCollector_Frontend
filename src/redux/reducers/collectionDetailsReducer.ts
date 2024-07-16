import { CollectionDetailsAction } from "../actions/actions"
import { SET_TOTAL_CARDS, SET_TOTAL_VALUE } from "../actions/actionTypes"

const initialState = {
    totalCards: 0,
    totalValue: 0
}

const collectionDetailsReducer = (state = initialState, action: CollectionDetailsAction) => {
    switch (action.type) {
        case SET_TOTAL_CARDS:
            return { ...state, totalCards: action.payload };
        case SET_TOTAL_VALUE:
            return { ...state, totalValue: action.payload };
        default:
            return state;
    }
}

export default collectionDetailsReducer;