import { LoginActionType } from "../actions/actions"
import { LOGIN, LOGOUT } from "../actions/actionTypes"
import User from '../../models/User'
import Cookies from "js-cookie"

type AuthState = {
    isAuthenticated: boolean,
    user: User | null
}

const authCookie = Cookies.get("auth");
const hasAuthCookie = authCookie !== null;

const initialState: AuthState = {
    isAuthenticated: hasAuthCookie,
    user: hasAuthCookie ? { username: authCookie as string } : null
}

const authReducer = (state: AuthState = initialState, action: LoginActionType) => {
    switch (action.type) {
        case LOGIN:
            return { isAuthenticated: true, user: action.payload.username }
        case LOGOUT:
            return { isAuthenticated: false, user: null }
        default:
            return state;
    }
}

export default authReducer;