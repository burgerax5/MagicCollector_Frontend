import React, { useState, useEffect } from 'react'
import { LoginField } from '../../models/UserLogin';
import { IoCloseCircle } from 'react-icons/io5';

type Props = {
    email: string,
    resetField: (field: LoginField) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: LoginField) => void
}


const EmailField = ({ email, resetField, onChange }: Props) => {
    const [error, setError] = useState("");
    const [isMinimised, setIsMinimised] = useState(email.length > 0);

    const handleFocus = () => setIsMinimised(true);

    const handleBlur = () => {
        const emailLength = email.length;
        setIsMinimised(emailLength > 0);
        if (emailLength === 0)
            setError("Email cannot be empty");
    }

    const handleClearField = () => {
        resetField("email")
        setIsMinimised(false);
        setError("Email cannot be empty");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, "email");

        // Check validity of email if one is entered
        if (e.target.value.length > 0) {
            if (!validateEmail(e.target.value)) setError("Invalid email");
            else setError("");
        }
        // Can't have empty email
        else {
            setError("Email cannot be empty");
        }
    }

    const validateEmail = (email: string) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

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
            {error && <span>{error}</span>}
        </div>
    )
}

export default EmailField