import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

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

const isValidToken = () => {
    const authCookie = Cookies.get("auth");
    return authCookie !== undefined && verifyToken(authCookie);
}

const getUsername = () => {
    const authCookie = Cookies.get("auth");
    const isAuthenticated = isValidToken();

    if (!isAuthenticated && authCookie !== undefined)
        return null;

    return jwtDecode<Payload>(authCookie as string).unique_name
}

export { isValidToken, getUsername }