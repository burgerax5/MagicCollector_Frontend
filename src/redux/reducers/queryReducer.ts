import { Filters, Pagination } from "../../models/Filters/IFilter";
import { FoilFilter } from "../../models/Filters/IFoilFilter";
import { SortBy } from "../../models/Filters/ISortBy";
import { QueryActionType } from "../actions/actions";
import { REPLACE_FILTERS, RESET_FILTERS, SET_CURRENT_PAGE, SET_EDITION_FILTER, SET_FOIL_FILTER, SET_SEARCH_FILTER, SET_SORTING_FILTER, SET_TOTAL_PAGES } from "../actions/actionTypes";

const initialState: Filters & Pagination = {
    search: "",
    editionId: 0,
    sortBy: "name_asc",
    foilFilter: "any",
    currentPage: 1,
    totalPages: 0,
};

const queryReducer = (state = initialState, action: QueryActionType): Filters & Pagination => {
    switch (action.type) {
        case SET_TOTAL_PAGES:
            if ('payload' in action)
                return {
                    ...state,
                    totalPages: action.payload as number
                }
            return state;
        case SET_CURRENT_PAGE:
            if ('payload' in action)
                return {
                    ...state,
                    currentPage: action.payload as number
                }
            return state;
        case SET_FOIL_FILTER:
            if ('payload' in action)
                return {
                    ...state,
                    foilFilter: action.payload as FoilFilter
                }
            return state;
        case SET_SORTING_FILTER:
            if ('payload' in action)
                return {
                    ...state,
                    sortBy: action.payload as SortBy
                }
            return state;
        case SET_EDITION_FILTER:
            if ('payload' in action)
                return {
                    ...state,
                    editionId: action.payload as number
                }
            return state;
        case SET_SEARCH_FILTER:
            if ('payload' in action)
                return {
                    ...state,
                    search: action.payload as string
                }
            return state;
        case REPLACE_FILTERS:
            if ('payload' in action)
                return action.payload as Filters & Pagination
            return state;
        case RESET_FILTERS:
            return initialState;
        default:
            return state;
    }
};

export default queryReducer