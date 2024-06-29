import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";

const ThemeToggle = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <div className="toggle-theme">
            <MdOutlineLightMode />
            <div className={isDarkTheme ? "toggle-slider toggled" : "toggle-slider"} onClick={toggleTheme}>
                <span className={isDarkTheme ? "toggle-slider-circle toggled" : "toggle-slider-circle"}></span>
            </div>
            <MdOutlineDarkMode />
        </div>
    )
}

export default ThemeToggle