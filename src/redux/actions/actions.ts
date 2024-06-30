import { TOGGLE_THEME } from "./actionTypes";

export const toggleTheme = () => ({
    type: TOGGLE_THEME,
});

export type ThemeAction = ReturnType<typeof toggleTheme>;