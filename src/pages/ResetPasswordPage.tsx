import { useState } from 'react'
import Logo from '../components/Logo'
import { LoginField } from '../models/UserLogin'
import PasswordField from '../components/LoginFields/PasswordField'
import ConfirmPasswordField from '../components/LoginFields/ConfirmPasswordField'
import { useNavigate } from 'react-router-dom'
import resetPassword from '../api/user/resetPassword'

const initialState = {
    password: "",
    confirmPassword: ""
}

const ResetPasswordPage = () => {
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const updateField = (e: React.ChangeEvent<HTMLInputElement>, name: LoginField) => setForm({ ...form, [name]: e.target.value })
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" })

    const matchingPassword = form.password === form.confirmPassword;
    const allFieldsFilled = form.password && form.confirmPassword;

    const submitPasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);
        let token = params.get("token");

        const res = await resetPassword(form.password, token!);
        if (res.ok) {
            navigate("/login")
        } else {
            const data = await res.json();
            setError(data.message);
        }
    }

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <h1>Reset Password</h1>
                {error && <div className="warning">{error}</div>}
                <form className="auth-form" onSubmit={submitPasswordReset}>
                    <PasswordField password={form.password} resetField={resetField} onChange={updateField} isRegisterForm={true} />
                    <ConfirmPasswordField
                        password={form.password}
                        confirmPassword={form.confirmPassword}
                        resetField={resetField}
                        onChange={updateField} />

                    <button
                        className={allFieldsFilled && matchingPassword ? "submit-btn" : "submit-btn disabled"}
                        disabled={!allFieldsFilled || !matchingPassword}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage