import { useState } from 'react';
import LogoDark from '../../assets/logo_dark.png';
import LogoLight from '../../assets/logo_light.png';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../styles/header.css';
import { RootState } from '../../redux/reducers/rootReducer';

import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" />
            </Link>

            <nav className="navbar">
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <IoClose /> : <IoMenu />}
                </div>

                <ul className={isOpen ? "nav-links open" : "nav-links"}>
                    <li>
                        <ThemeToggle />
                    </li>
                    <li>
                        <Link to="/cards" onClick={toggleMenu}>All Cards</Link>
                    </li>
                    <li>
                        <Link to="/sets" onClick={toggleMenu}>All Sets</Link>
                    </li>
                    <li>
                        <Link to="/mycards" onClick={toggleMenu}>My Cards</Link>
                    </li>
                    <li>
                        <Link to="/login" className="login" onClick={toggleMenu}>Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="register" onClick={toggleMenu}>Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header