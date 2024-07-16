import { EditionDropdown } from "../../models/Editions/EditionDropdown";
import { SetEditionsDropdownAction } from "../actions/actions";
import { SET_EDITIONS_DROPDOWN } from "../actions/actionTypes";

const initialState: EditionDropdown[] = [];

const editionDropdownReducer = (state = initialState, action: SetEditionsDropdownAction) => {
    switch (action.type) {
        case SET_EDITIONS_DROPDOWN:
            return action.payload;
        default:
            return state;
    }
}

export default editionDropdownReducer;