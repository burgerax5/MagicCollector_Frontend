import { Queries } from "../../models/Filters/IFilter";
import { QueryActionType } from "../actions/actions";
import { SET_FILTERS, SET_PAGINATION } from "../actions/actionTypes";

const initialState: Queries = {
    filters: {
        search: "",
        sortBy: "name_asc",
        foilFilter: "any",
    },
    pagination: {
        currentPage: 1,
        totalPages: 0,
    }
};

const queryReducer = (state = initialState, action: QueryActionType) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload,
                }
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
};

export default queryReducer