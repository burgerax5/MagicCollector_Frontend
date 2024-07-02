import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { LoginField } from '../../models/UserLogin';

type Props = {
    password: string,
    resetField: (field: LoginField) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordField = (props: Props) => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isMinimised, setIsMinimised] = useState(false);

    const handleFocus = () => setIsMinimised(true);

    const handleBlur = () => {
        const passwordLength = props.password.length;
        setIsMinimised(passwordLength > 0);
        if (passwordLength === 0)
            setError("Password cannot be empty");
    }

    const handleClearField = () => {
        props.resetField("password")
        setIsMinimised(false);
        setError("Password cannot be empty");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
        if (e.target.value.length > 0) setError("");
    }

    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
        <div className={error.length > 0 ? "auth-input error" : "auth-input"}>
            <label htmlFor="password" className={isMinimised ? "minimised" : ""}>Password</label>

            {/* Clear field */}
            {props.password.length > 0 && <IoCloseCircle style={{ right: "3.5rem" }} onClick={handleClearField} className="clear-field" />}

            {/* Toggle password */}
            {showPassword ? <PiEye onClick={toggleShowPassword} className="toggle-password" />
                : <PiEyeClosed onClick={toggleShowPassword} className="toggle-password" />}

            <input
                id="password"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={props.password}
                onChange={handleChange}
                autoComplete="current-password"
                required />
            {error && <span>Password cannot be empty</span>}
        </div>
    )
}

export default PasswordField