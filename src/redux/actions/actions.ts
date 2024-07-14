import { Filters } from "../../models/Filters/IFilter";
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

export const SetTotalPagesAction = (total_pages: number) => ({
    type: actions.SET_TOTAL_PAGES,
    payload: total_pages
});

export const SetReqFlagAction = () => ({
    type: actions.SET_REQ_FLAG,
    payload: 1
});

export const ResetReqFlagAction = () => ({
    type: actions.RESET_REQ_FLAG,
    payload: 0
});

export type ThemeActionType = ReturnType<typeof toggleTheme>;
export type LoginActionType = ReturnType<typeof LoginAction>;
export type QueryActionType = ReturnType<typeof SetTotalPagesAction>;
export type ReqFlagActionType = ReturnType<typeof SetReqFlagAction>;