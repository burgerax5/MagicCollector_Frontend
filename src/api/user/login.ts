import { UserLogin } from "../../models/UserLogin";
import apiURL from "../config";

const requestLogin = async (form: UserLogin) => {
    const url = apiURL + '/api/user/login';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })

    return res;
}

export default requestLogin