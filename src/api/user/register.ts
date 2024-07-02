import { UserLogin } from '../../models/UserLogin'

const requestRegister = async (form: UserLogin) => {
    const url = 'https://localhost:44321/api/user/register';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
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