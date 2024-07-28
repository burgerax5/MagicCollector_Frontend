import { useState } from 'react'
import '../styles/auth.css'
import { LoginField } from '../models/UserLogin';
import Logo from '../components/Logo';
import React from 'react'
import EmailField from '../components/LoginFields/EmailField';

const initialFormState = {
    email: ""
}

const ForgotPassword = () => {
    const [form, setForm] = useState(initialFormState);

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value });
    const resetField = (field: LoginField) => setForm({ ...form, [field]: "" });

    const sendResetRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                <div>
                    <h1>Forgot Password</h1>
                    <div className="message">We'll send you an email with the password reset link. Check Junk Email if you don't see it.</div>
                </div>
                <form className="auth-form" onSubmit={sendResetRequest}>
                    <EmailField email={form.email} resetField={resetField} onChange={updateEmail} />
                    <button
                        className={form.email ? "submit-btn" : "submit-btn disabled"}
                        disabled={!(form.email)}>
                        Send Request
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword