import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import LogoDark from '../assets/logo_dark.png';
import LogoLight from '../assets/logo_light.png';
import '../styles/auth.css'
import UsernameField from '../components/LoginFields/UsernameField';

const initialFormState = {
    username: "",
    password: ""
}

const LoginPage = () => {
    const [form, setForm] = useState(initialFormState);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value })
    const resetField = (field: "username" | "password") => setForm({ ...form, [field]: "" })

    return (
        <div className="container">
            <div className="auth-form-container">
                <img src={isDarkMode ? LogoDark : LogoLight} />
                <h1>Account Login</h1>
                <form className="auth-form">
                    <UsernameField username={form.username} resetField={resetField} onChange={updateUsername} />
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage