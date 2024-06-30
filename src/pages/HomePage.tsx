import LogoDark from '../assets/logo_dark.png';
import LogoLight from '../assets/logo_light.png';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import { Link } from 'react-router-dom';
import '../styles/home.css'

const HomePage = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <div>
            <section className="hero">
                <div className="hero-content">
                    <img src={isDarkMode ? LogoDark : LogoLight} />
                    <p>Track the prices of your Magic: The Gathering card collection</p>
                    <Link to="/register" className="call-to-action">Sign Up Today!</Link>
                </div>
                <div className="hero-gradient"></div>
                <div className="hero-bg"></div>
            </section>
        </div>
    )
}

export default HomePage