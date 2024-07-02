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

export type ThemeActionType = ReturnType<typeof toggleTheme>;
export type AuthActionTypes = ReturnType<typeof LoginAction | typeof LogoutAction>;