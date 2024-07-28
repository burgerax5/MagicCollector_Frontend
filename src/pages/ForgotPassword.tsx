import { useEffect, useState } from 'react'
import '../styles/auth.css'
import Logo from '../components/Logo';
import React from 'react'
import EmailField from '../components/LoginFields/EmailField';
import requestPasswordReset from '../api/user/requestPasswordReset';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const resetField = () => setEmail("");

    const sendResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await requestPasswordReset(email);
        setEmailSent(true);
    }

    const validateEmail = (email: string) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    useEffect(() => {
        if (validateEmail(email))
            setValidEmail(true);
        else
            setValidEmail(false);
    }, [email]);

    return (
        <div className="container">
            <div className="auth-form-container">
                <Logo />
                {emailSent ?
                    <div>
                        <h2>Password Reset Email Sent</h2>
                        <div className="message">Check Junk Email if you don't see it.</div>
                    </div>
                    :
                    <>
                        <div>
                            <h1>Forgot Password</h1>
                            <div className="message">We'll send you an email with the password reset link. Check Junk Email if you don't see it.</div>
                        </div>
                        <form className="auth-form" onSubmit={sendResetRequest}>
                            <EmailField email={email} resetField={resetField} onChange={updateEmail} />
                            <button
                                className={email && validEmail ? "submit-btn" : "submit-btn disabled"}
                                disabled={!validEmail}>
                                Send Request
                            </button>
                        </form>
                    </>}
            </div>
        </div>
    )
}

export default ForgotPassword