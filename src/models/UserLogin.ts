export type UserLogin = {
    email?: string,
    username: string,
    password: string
}

export type LoginField = "email" | "username" | "password" | "confirmPassword";