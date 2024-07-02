import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;