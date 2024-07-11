import { Queries } from "../../models/Filters/IFilter";
import { QueryActionType } from "../actions/actions";
import { SET_TOTAL_PAGES } from "../actions/actionTypes";

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