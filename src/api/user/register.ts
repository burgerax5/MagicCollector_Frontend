import { UserLogin } from '../../models/UserLogin'
import apiURL from '../config';

const requestRegister = async (form: UserLogin) => {
    const url = apiURL + '/api/user/register';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: form.email,
            username: form.username,
            password: form.password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    return res;
}

export default requestRegister;