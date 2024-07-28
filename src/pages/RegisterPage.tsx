import { useState } from 'react'
import Logo from '../components/Logo';
import '../styles/auth.css'
import UsernameField from '../components/LoginFields/UsernameField';
import PasswordField from '../components/LoginFields/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmPasswordField from '../components/LoginFields/ConfirmPasswordField';
import requestRegister from '../api/user/register';
import { LoginField } from '../models/UserLogin';
import EmailField from '../components/LoginFields/EmailField';

const initialFormState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
}
const RegisterPage = () => {
    const [form, setForm] = useState(initialFormState);
    const navigate = useNavigate();

    const updateField = (e: React.ChangeEvent<HTMLInputElement>, name: LoginField) => setForm({ ...form, [name]: e.target.value })
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" })

    const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await requestRegister({ username: form.username, password: form.password });

        if (res.ok) {
            navigate("/login");
        }
    }

    const matchingPassword = form.password === form.confirmPassword;
    const allFieldsFilled = form.email && form.username && form.password && form.confirmPassword;

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <h1>Sign Up</h1>
                <form className="auth-form" onSubmit={submitRegister}>
                    <EmailField email={form.email} resetField={resetField} onChange={updateField} />
                    <UsernameField username={form.username} resetField={resetField} onChange={updateField} />
                    <PasswordField password={form.password} resetField={resetField} onChange={updateField} isRegisterForm={true} />
                    <ConfirmPasswordField
                        password={form.password}
                        confirmPassword={form.confirmPassword}
                        resetField={resetField}
                        onChange={updateField} />

                    <button
                        className={allFieldsFilled && matchingPassword ? "submit-btn" : "submit-btn disabled"}
                        disabled={!allFieldsFilled || !matchingPassword}>
                        Register
                    </button>
                    <span className="link-msg">Already a member? <Link className="link" to="/login">Sign In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage