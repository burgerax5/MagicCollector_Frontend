import { LoginActionType } from "../actions/actions"
import { LOGIN, LOGOUT } from "../actions/actionTypes"
import User from '../../models/User'
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

type AuthState = {
    isAuthenticated: boolean,
    user: User | null
}

type Payload = {
    unique_name: string,
    nbf: number,
    exp: number,
    iat: number
}

const verifyToken = (token: string): boolean => {
    try {
        const decoded: Payload = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if token has expired
        if (decoded.exp < currentTime) {
            Cookies.remove("auth");
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

const authCookie = Cookies.get("auth");
const hasAuthCookie = authCookie !== undefined && verifyToken(authCookie);

const initialState: AuthState = {
    isAuthenticated: hasAuthCookie,
    user: hasAuthCookie ? { username: jwtDecode<Payload>(authCookie).unique_name } : null
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