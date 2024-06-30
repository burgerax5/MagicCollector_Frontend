// themeReducer.ts
import { TOGGLE_THEME } from "../actions/actionTypes";
import { ThemeAction } from "../actions/actions";

export type ThemeState = {
    isDarkMode: boolean;
};

const isPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: ThemeState = {
    isDarkMode: isPrefersDark,
};

const themeReducer = (state: ThemeState = initialState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case TOGGLE_THEME:
            return { ...state, isDarkMode: !state.isDarkMode };
        default:
            return state;
    }
};

export default themeReducer;
