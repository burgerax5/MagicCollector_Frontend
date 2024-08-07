import LogoDark from '../assets/logo_dark.webp';
import LogoLight from '../assets/logo_light.webp';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'

const Logo = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <img src={isDarkMode ? LogoDark : LogoLight} alt="MagicGatherer Logo" width="200" height="40" />
    )
}

export default Logo