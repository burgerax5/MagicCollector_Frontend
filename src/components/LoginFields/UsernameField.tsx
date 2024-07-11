import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { LoginField } from '../../models/UserLogin';

type Props = {
    username: string,
    resetField: (field: LoginField) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UsernameField = ({ username, resetField, onChange }: Props) => {
    const [error, setError] = useState("");
    const [isMinimised, setIsMinimised] = useState(username.length > 0);

    const handleFocus = () => setIsMinimised(true);

    const handleBlur = () => {
        const usernameLength = username.length;
        setIsMinimised(usernameLength > 0);
        if (usernameLength === 0)
            setError("Username cannot be empty");
    }

    const handleClearField = () => {
        resetField("username")
        setIsMinimised(false);
        setError("Username cannot be empty");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (e.target.value.length > 0) setError("");
    }

    useEffect(() => {
        if (username.length > 0 && !isMinimised)
            setIsMinimised(true);
    }, [username]);

    return (
        <div className={error.length > 0 ? "auth-input error" : "auth-input"}>
            <label htmlFor="username" className={isMinimised ? "minimised" : ""}>Username</label>
            {username.length > 0 && <IoCloseCircle onClick={handleClearField} className="clear-field" />}
            <input
                id="username"
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={username}
                onChange={handleChange}
                autoComplete="username"
                required />
            {(username.length === 0 && error) && <span>Username cannot be empty</span>}
        </div>
    )
}

export default UsernameField