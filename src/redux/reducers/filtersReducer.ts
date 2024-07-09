import { FilterActionType } from "../actions/actions";
import { SET_FILTERS, SET_PAGINATION } from "../actions/actionTypes";

const initialState = {
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

const filtersReducer = (state = initialState, action: FilterActionType) => {
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
