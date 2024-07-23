import { Filters, Pagination } from "../../models/Filters/IFilter";
import { QueryActionType } from "../actions/actions";
import { RESET_FILTERS, SET_CURRENT_PAGE, SET_EDITION_FILTER, SET_FOIL_FILTER, SET_SEARCH_FILTER, SET_SORTING_FILTER, SET_TOTAL_PAGES } from "../actions/actionTypes";

const initialState: Filters & Pagination = {
    search: "",
    editionId: 0,
    sortBy: "name_asc",
    foilFilter: "any",
    currentPage: 1,
    totalPages: 0,
};

const queryReducer = (state = initialState, action: QueryActionType) => {
    switch (action.type) {
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload as number
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload as number
            }
        case SET_FOIL_FILTER:
            if (typeof action.payload === 'string')
                return {
                    ...state,
                    foilFilter: action.payload as string
                }
            return state;
        case SET_SORTING_FILTER:
            if (typeof action.payload === 'string')
                return {
                    ...state,
                    sortBy: action.payload as string
                }
            return state;
        case SET_EDITION_FILTER:
            return {
                ...state,
                editionId: action.payload as number
            }
        case SET_SEARCH_FILTER:
            if (typeof action.payload === 'string')
                return {
                    ...state,
                    search: action.payload as string
                }
            return state;
        case RESET_FILTERS:
            return initialState;
        default:
            return state;
    }
};

export default queryReducer