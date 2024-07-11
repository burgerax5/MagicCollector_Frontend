import { useState } from 'react'
import Logo from '../components/Logo';
import '../styles/auth.css'
import UsernameField from '../components/LoginFields/UsernameField';
import PasswordField from '../components/LoginFields/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmPasswordField from '../components/LoginFields/ConfirmPasswordField';
import requestRegister from '../api/user/register';
import { LoginField } from '../models/UserLogin';

const initialFormState = {
    username: "",
    password: "",
    confirmPassword: ""
}
const RegisterPage = () => {
    const [form, setForm] = useState(initialFormState);
    const navigate = useNavigate();

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value })
    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })
    const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, confirmPassword: e.target.value })
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" })

    const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await requestRegister({ username: form.username, password: form.password });

        if (res.ok) {
            navigate("/login");
        }
    }

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <h1>Sign Up</h1>
                <form className="auth-form" onSubmit={submitRegister}>
                    <UsernameField username={form.username} resetField={resetField} onChange={updateUsername} />
                    <PasswordField password={form.password} resetField={resetField} onChange={updatePassword} isRegisterForm={true} />
                    <ConfirmPasswordField
                        password={form.password}
                        confirmPassword={form.confirmPassword}
                        resetField={resetField}
                        onChange={updateConfirmPassword} />

                    <button
                        className={form.username && form.password ? "submit-btn" : "submit-btn disabled"}
                        disabled={!(form.username && form.password) || form.password !== form.confirmPassword}>
                        Register
                    </button>
                    <span className="link-msg">Already a member? <Link className="link" to="/login">Sign In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage