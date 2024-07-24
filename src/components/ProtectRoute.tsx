import { useSelector } from "react-redux"
import { RootState } from "../redux/reducers/rootReducer"
import { Navigate } from "react-router-dom"
import { GUESTS_ONLY, USERS_ONLY, ProtectMode } from "../models/ProtectMode"
import { getUsername } from "../utils/checkAuthenticated"

type Props = {
    children: JSX.Element,
    mode: ProtectMode
}

const PrivateRoute = ({ children, mode }: Props) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated && mode === USERS_ONLY)
        return <Navigate to="/login" replace />
    else if (isAuthenticated && mode === GUESTS_ONLY)
        return <Navigate to={`/user/${getUsername()}`} replace />

    return children;
}

export default PrivateRoute