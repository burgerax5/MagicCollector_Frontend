import apiURL from "../config";

const resetPassword = async (password: string, token: string) => {
    const url = apiURL + '/api/user/reset-password?token=' + token;
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })

    return res;
}

export default resetPassword;