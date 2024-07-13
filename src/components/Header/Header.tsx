import { useState } from 'react';
import { Link } from "react-router-dom";
import '../../styles/header.css';
import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';
import Logo from '../Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { FiLogOut } from "react-icons/fi";
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../redux/actions/actions';
import { getUsername } from '../../utils/checkAuthenticated';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        Cookies.remove('auth');
        dispatch(LogoutAction());
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
                        <Link to="/editions" onClick={toggleMenu}>All Editions</Link>
                    </li>
                    <li>
                        <Link to={"/mycards?user=" + getUsername()} onClick={toggleMenu}>My Cards</Link>
                    </li>
                    {!isAuthenticated ?
                        <>
                            <li>
                                <Link to="/login" className="login" onClick={toggleMenu}>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="register" onClick={toggleMenu}>Register</Link>
                            </li>
                        </> :
                        <li>
                            <Link to="/" onClick={logout} className="logout">
                                Logout
                                <FiLogOut />
                            </Link>
                        </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header