import { LoginActionType } from "../actions/actions"
import { LOGIN, LOGOUT } from "../actions/actionTypes"
import { isValidToken, getUsername } from "../../utils/checkAuthenticated"

type AuthState = {
    isAuthenticated: boolean,
    username: string | null
}

const initialState: AuthState = {
    isAuthenticated: isValidToken(),
    username: getUsername()
}

const authReducer = (state: AuthState = initialState, action: LoginActionType) => {
    switch (action.type) {
        case LOGIN:
            return { isAuthenticated: true, username: action.payload.username }
        case LOGOUT:
            return { isAuthenticated: false, username: null }
        default:
            return state;
    }
}

export default authReducer;