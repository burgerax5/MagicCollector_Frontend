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
import validateEmail from '../utils/validateEmail';

const initialFormState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
}
const RegisterPage = () => {
    const [form, setForm] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const updateField = (e: React.ChangeEvent<HTMLInputElement>, name: LoginField) => setForm({ ...form, [name]: e.target.value })
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" })

    const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await requestRegister({ email: form.email, username: form.username, password: form.password });

        if (res.ok) {
            navigate("/login");
        } else {
            const errorData = await res.json();
            setError(errorData.message);
        }
    }

    const matchingPassword = form.password === form.confirmPassword;
    const allFieldsFilled = form.email && form.username && form.password && form.confirmPassword;
    const validEmail = validateEmail(form.email);

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <h1>Sign Up</h1>
                {error && <div className="warning">{error}</div>}
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
                        className={allFieldsFilled && matchingPassword && validEmail ? "submit-btn" : "submit-btn disabled"}
                        disabled={!allFieldsFilled || !matchingPassword || !validEmail}>
                        Register
                    </button>
                    <span className="link-msg">Already a member? <Link className="link" to="/login">Sign In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage