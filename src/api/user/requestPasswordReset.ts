import apiURL from "../config";

const requestPasswordReset = async (email: string) => {
    const url = apiURL + '/api/user/forgot-password';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })

    return res;
}

export default requestPasswordReset;