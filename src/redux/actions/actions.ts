import { EditionDropdown } from "../../models/Editions/EditionDropdown";
import { Filters } from "../../models/Filters/IFilter";
import { CardConditionOwnedDTO } from "../../models/UserCards/CardConditionsOwnedDTO";
import * as actions from "./actionTypes";

// Theme
export const toggleTheme = () => ({
    type: actions.TOGGLE_THEME,
});

// Auth
export const LoginAction = (username: string) => ({
    type: actions.LOGIN,
    payload: {
        username
    }
});

export const LogoutAction = () => ({
    type: actions.LOGOUT
});

// Pagination
export const SetTotalPagesAction = (total_pages: number) => ({
    type: actions.SET_TOTAL_PAGES,
    payload: total_pages
});

// Cards Owned
type Mode = "old" | "new";

export const AddCardOwnedAction = (mode: Mode, cardOwned: CardConditionOwnedDTO) => ({
    type: actions.ADD_CARD_OWNED,
    payload: {
        mode,
        cardOwned
    }
});

export const UpdateCardOwnedAction = (mode: Mode, cardOwned: CardConditionOwnedDTO) => ({
    type: actions.UPDATE_CARD_OWNED,
    payload: {
        mode,
        cardOwned
    }
});

export const DeleteCardOwnedAction = (mode: Mode, condition: string) => ({
    type: actions.DELETE_CARD_OWNED,
    payload: {
        mode,
        condition
    }
});

export const ResetCardsOwnedAction = () => ({
    type: actions.RESET_CARDS_OWNED
});

// Collection Details
export const SetTotalCardsAction = (totalCards: number) => ({
    type: actions.SET_TOTAL_CARDS,
    payload: totalCards
});

export const SetTotalValueAction = (totalValue: number) => ({
    type: actions.SET_TOTAL_VALUE,
    payload: totalValue
});

// Editions Dropdown
export const SetEditionsDropdownAction = (editionDropdown: EditionDropdown[]) => ({
    type: actions.SET_EDITIONS_DROPDOWN,
    payload: editionDropdown
});

// Filters
export const SetFilter = (type: string, payload: string | number) => ({
    type,
    payload
});

export const ResetFilter = () => ({
    type: actions.RESET_FILTERS
});

export type ThemeActionType = ReturnType<typeof toggleTheme>;
export type LoginActionType = ReturnType<typeof LoginAction>;
export type QueryActionType = ReturnType<typeof SetTotalPagesAction>;
export type CardOwnedAction = ReturnType<typeof AddCardOwnedAction | typeof UpdateCardOwnedAction | typeof DeleteCardOwnedAction>;
export type ResetCardOwnedAction = ReturnType<typeof ResetCardsOwnedAction>;
export type CollectionDetailsAction = ReturnType<typeof SetTotalCardsAction | typeof SetTotalValueAction>;
export type SetEditionsDropdownAction = ReturnType<typeof SetEditionsDropdownAction>;