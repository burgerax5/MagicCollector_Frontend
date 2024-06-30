// themeReducer.ts
import { TOGGLE_THEME } from "../actions/actionTypes";
import { ThemeAction } from "../actions/actions";
import Cookies from "js-cookie";

export type ThemeState = {
    isDarkMode: boolean;
};

const themeCookie = Cookies.get('isDarkMode');
const matchMedia = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: ThemeState = {
    isDarkMode: themeCookie ? themeCookie === 'true' : matchMedia
};

const themeReducer = (state: ThemeState = initialState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case TOGGLE_THEME:
            const newTheme = !state.isDarkMode;
            Cookies.set('isDarkMode', newTheme.toString());
            return { ...state, isDarkMode: newTheme };
        default:
            return state;
    }
};

export default themeReducer;
