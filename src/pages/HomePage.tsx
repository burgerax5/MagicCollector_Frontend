import LogoDark from '../assets/logo_dark.png';
import LogoLight from '../assets/logo_light.png';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import { Link } from 'react-router-dom';
import '../styles/home.css'

import TempImg from '../assets/tmp_img.png'
import TempImg2 from '../assets/tmp_img2.png'

const HomePage = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <div style={{ background: "var(--background)" }}>
            <section className="hero">
                <div className="hero-content">
                    <img src={isDarkMode ? LogoDark : LogoLight} />
                    <p>Track the prices of your Magic: The Gathering card collection</p>
                    <Link to="/register" className="call-to-action">Sign Up Today!</Link>
                </div>
                <div className="hero-gradient"></div>
                <div className="hero-bg"></div>
            </section>
            <section className="home-content">
                <article>
                    <h2>Track the Prices of <br></br>Your Collection</h2>
                    <p>
                        MagicGatherer will scrape data from CardKingdom every 24 hours so you can easily keep track of the prices of your cards
                    </p>
                    <ul>
                        <li>Prices for different card conditions</li>
                        <li>Variants (e.g. foils)</li>
                        <li>Filters to make it easier to search for a particular card</li>
                    </ul>
                </article>
                <img src={isDarkMode ? TempImg : TempImg2} />
            </section>
        </div>
    )
}

export default HomePage