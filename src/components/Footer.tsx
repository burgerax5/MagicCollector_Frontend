import Logo from './Logo'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/cards">Cards</Link>
                    </li>
                    <li>
                        <Link to="/editions">Editions</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer