import React from 'react'
import LogoDark from '../../assets/logo_dark.png'
import { Link } from "react-router-dom"
import '../../styles/header.css'

const Header = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={LogoDark} />
            </Link>

            <ul>
                <li>
                    <Link to="/cards">All Cards</Link>
                </li>
                <li>
                    <Link to="/sets">All Sets</Link>
                </li>
                <li>
                    <Link to="/mycards">My Cards</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header