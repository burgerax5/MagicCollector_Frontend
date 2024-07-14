import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import queryReducer from "./queryReducer";
import reqFlagReducer from "./reqFlagReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    queries: queryReducer,
    flag: reqFlagReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;