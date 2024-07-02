import { UserLogin } from "../../models/UserLogin";

const requestLogin = async (form: UserLogin) => {
    const url = 'https://localhost:7136/api/user/login';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    return res;
}

export default requestLogin