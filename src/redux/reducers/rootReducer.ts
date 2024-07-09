import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import queryReducer from "./queryReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    queries: queryReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;