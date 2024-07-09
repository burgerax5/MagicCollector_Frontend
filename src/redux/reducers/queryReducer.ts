import { Queries, Filters } from "../../models/Filters/IFilter";
import { QueryActionType } from "../actions/actions";
import { SET_FILTERS, SET_CURR_PAGE, SET_TOTAL_PAGES } from "../actions/actionTypes";

const initialState: Queries = {
    filters: {
        search: "",
        sortBy: "name_asc",
        foilFilter: "any",
    },
    pagination: {
        currentPage: 1,
        totalPages: 2000,
    }
};

const queryReducer = (state = initialState, action: QueryActionType) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    filters: action.payload as Filters,
                }
            };
        case SET_CURR_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload as number,
                }
            };
        case SET_TOTAL_PAGES:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    totalPages: action.payload as number
                }
            }
        default:
            return state;
    }
};

export default queryReducer