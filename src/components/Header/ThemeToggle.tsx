import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { RootState } from '../../redux/reducers/rootReducer';
import { toggleTheme } from '../../redux/actions/actions';

const ThemeToggle: React.FC = () => {
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className="toggle-theme">
            <MdOutlineLightMode />
            <div
                className={isDarkTheme ? "toggle-slider toggled" : "toggle-slider"}
                onClick={handleToggleTheme}>
                <span className={isDarkTheme ? "toggle-slider-circle toggled" : "toggle-slider-circle"}></span>
            </div>
            <MdOutlineDarkMode />
        </div>
    );
};

export default ThemeToggle;
