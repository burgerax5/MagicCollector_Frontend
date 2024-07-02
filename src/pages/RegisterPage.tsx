import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import LogoDark from '../assets/logo_dark.png';
import LogoLight from '../assets/logo_light.png';
import '../styles/auth.css'
import UsernameField from '../components/LoginFields/UsernameField';
import PasswordField from '../components/LoginFields/PasswordField';
import { Link } from 'react-router-dom';
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
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value })
    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })
    const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, confirmPassword: e.target.value })
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" })

    const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await requestRegister({ username: form.username, password: form.password });
        console.log(res)
    }

    return (
        <div className="container">
            <div className="auth-form-container">
                <img src={isDarkMode ? LogoDark : LogoLight} alt="MagicGatherer Logo" />
                <h1>Sign Up</h1>
                <form className="auth-form" onSubmit={submitRegister}>
                    <UsernameField username={form.username} resetField={resetField} onChange={updateUsername} />
                    <PasswordField password={form.password} resetField={resetField} onChange={updatePassword} />
                    <ConfirmPasswordField
                        password={form.password}
                        confirmPassword={form.confirmPassword}
                        resetField={resetField}
                        onChange={updateConfirmPassword} />

                    <button
                        className={form.username && form.password ? "submit-btn" : "submit-btn disabled"}
                        disabled={!(form.username && form.password) || form.password !== form.confirmPassword}>
                        Log In
                    </button>
                    <span className="link-msg">Already a member? <Link className="link" to="/login">Sign In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage