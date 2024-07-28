import { useState } from 'react'
import '../styles/auth.css'
import UsernameField from '../components/LoginFields/UsernameField';
import PasswordField from '../components/LoginFields/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import requestLogin from '../api/user/login';
import { LoginField } from '../models/UserLogin';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../redux/actions/actions';
import Logo from '../components/Logo';
import Cookies from 'js-cookie';

const initialFormState = {
    username: "",
    password: ""
}

const LoginPage = () => {
    const [form, setForm] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value });
    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value });
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" });

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await requestLogin(form);
        const data = await res.json();

        if (res.ok) {
            Cookies.set("auth", data.token);
            dispatch(LoginAction(form.username));
            navigate("/");
        } else {
            setError(data.message);
        }
    }

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <h1>Log In</h1>
                {error && <div className="warning">{error}</div>}
                <form className="auth-form" onSubmit={submitLogin}>
                    <UsernameField username={form.username} resetField={resetField} onChange={updateUsername} />
                    <PasswordField password={form.password} resetField={resetField} onChange={updatePassword} isRegisterForm={false} />

                    <button
                        className={form.username && form.password ? "submit-btn" : "submit-btn disabled"}
                        disabled={!(form.username && form.password)}>
                        Log In
                    </button>
                    <div className="links">
                        <Link className="link" to="/forgot-password">Forgot Password?</Link>
                        <Link className="link" to="/register">Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage