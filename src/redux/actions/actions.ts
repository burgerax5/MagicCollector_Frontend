import { Filters } from "../../models/Filters/IFilter";
import { Pagination } from "../../models/Pagination";
import * as actions from "./actionTypes";

export const toggleTheme = () => ({
    type: actions.TOGGLE_THEME,
});

export const LoginAction = (username: string) => ({
    type: actions.LOGIN,
    payload: {
        username
    }
});

export const LogoutAction = () => ({
    type: actions.LOGOUT
});

export const SetFilterAction = (filters: Filters) => ({
    type: actions.SET_FILTERS,
    payload: {
        filters
    }
});

export const SetPaginationAction = (pagination: Pagination) => ({
    type: actions.SET_PAGINATION,
    payload: {
        pagination
    }
});

export type ThemeActionType = ReturnType<typeof toggleTheme>;
export type LoginActionType = ReturnType<typeof LoginAction>;
export type FilterActionType = ReturnType<typeof SetFilterAction | typeof SetPaginationAction>;