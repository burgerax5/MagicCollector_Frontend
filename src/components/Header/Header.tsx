import { useState } from 'react';
import { Link } from "react-router-dom";
import '../../styles/header.css';
import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';
import Logo from '../Logo';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                <Logo />
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