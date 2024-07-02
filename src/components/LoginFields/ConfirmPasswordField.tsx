import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { LoginField } from '../../models/UserLogin';

type Props = {
    password: string,
    confirmPassword: string,
    resetField: (field: LoginField) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ConfirmPasswordField = (props: Props) => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isMinimised, setIsMinimised] = useState(false);

    const handleFocus = () => setIsMinimised(true);

    const handleBlur = () => {
        const passwordLength = props.confirmPassword.length;
        setIsMinimised(passwordLength > 0);
        if (passwordLength === 0)
            setError("Confirm Password cannot be empty");
    }

    const handleClearField = () => {
        props.resetField("confirmPassword")
        setIsMinimised(false);
        setError("Confirm Password cannot be empty");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
        const samePassword = props.password === e.target.value;
        if (e.target.value.length > 0 && samePassword) setError("");
        else if (e.target.value.length > 0 && !samePassword) setError("Passwords do not match");
    }

    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
        <div className={error.length > 0 ? "auth-input error" : "auth-input"}>
            <label className={isMinimised ? "minimised" : ""}>Confirm Password</label>

            {/* Clear field */}
            {props.confirmPassword.length > 0 && <IoCloseCircle style={{ right: "3.5rem" }} onClick={handleClearField} className="clear-field" />}

            {/* Toggle password */}
            {showPassword ? <PiEye onClick={toggleShowPassword} className="toggle-password" />
                : <PiEyeClosed onClick={toggleShowPassword} className="toggle-password" />}

            <input
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={props.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required />

            {error && <span>{error}</span>}
        </div>
    )
}

export default ConfirmPasswordField