import React, { useState, useEffect } from 'react'
import { LoginField } from '../../models/UserLogin';
import { IoCloseCircle } from 'react-icons/io5';

type Props = {
    email: string,
    resetField: (field: LoginField) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const EmailField = ({ email, resetField, onChange }: Props) => {
    const [error, setError] = useState("");
    const [isMinimised, setIsMinimised] = useState(email.length > 0);

    const handleFocus = () => setIsMinimised(true);

    const handleBlur = () => {
        const emailLength = email.length;
        setIsMinimised(emailLength > 0);
        if (emailLength === 0)
            setError("email cannot be empty");
    }

    const handleClearField = () => {
        resetField("email")
        setIsMinimised(false);
        setError("email cannot be empty");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (e.target.value.length > 0) setError("");
    }

    useEffect(() => {
        if (email.length > 0 && !isMinimised)
            setIsMinimised(true);
    }, [email]);

    return (
        <div className={error.length > 0 ? "auth-input error" : "auth-input"}>
            <label htmlFor="email" className={isMinimised ? "minimised" : ""}>Email</label>
            {email.length > 0 && <IoCloseCircle onClick={handleClearField} className="clear-field" />}
            <input
                id="email"
                type="email"
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={email}
                onChange={handleChange}
                autoComplete="email"
                required />
            {(email.length === 0 && error) && <span>Email cannot be empty</span>}
        </div>
    )
}

export default EmailField