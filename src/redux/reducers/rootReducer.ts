import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import queryReducer from "./queryReducer";
import cardsOwnedReducer from "./cardsOwnedReducer";
import collectionDetailsReducer from "./collectionDetailsReducer";
import editionDropdownReducer from "./editionDropdownReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    queries: queryReducer,
    cardsOwned: cardsOwnedReducer,
    collectionDetails: collectionDetailsReducer,
    editions: editionDropdownReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;