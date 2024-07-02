import { LoginActionType } from "../actions/actions"
import { LOGIN, LOGOUT } from "../actions/actionTypes"
import User from '../../models/User'

type AuthState = {
    isAuthenticated: boolean,
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
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