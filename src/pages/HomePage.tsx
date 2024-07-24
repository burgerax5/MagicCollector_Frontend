import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import { Link } from 'react-router-dom';
import '../styles/home.css'

import ShowcaseLight from '../assets/ShowcaseLight.webp';
import ShowcaseDark from '../assets/ShowcaseDark.webp'
import Logo from '../components/Logo';

const HomePage = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <div style={{ background: "var(--background)" }}>
            <section className="hero">
                <div className="hero-content">
                    <Logo />
                    <p>Track the prices of your Magic: The Gathering card collection</p>
                    <Link to="/register" className="call-to-action">Sign Up Today!</Link>
                </div>
                <div className="hero-bg" />
            </section>
            <section className="home-content">
                <article>
                    <h2>Track Your Collection</h2>
                    <p>
                        MagicGatherer will scrape data from CardKingdom every 24 hours so you can easily keep track of the prices of your cards
                    </p>
                    <ul>
                        <li>Prices for different card conditions</li>
                        <li>Variants (e.g. foils)</li>
                        <li>Filters to make it easier to search for a particular card</li>
                    </ul>
                </article>
                <img src={isDarkMode ? ShowcaseDark : ShowcaseLight} alt="Snippet of card collection" loading='lazy' />
            </section>
        </div>
    )
}

export default HomePage