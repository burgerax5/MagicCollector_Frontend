import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { RootState } from '../../redux/reducers/rootReducer';
import { toggleTheme } from '../../redux/actions/actions';

const ThemeToggle: React.FC = () => {
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const bodyElement = document.querySelector("body");
        if (isDarkTheme && bodyElement)
            bodyElement.classList.add('dark-theme');
        else if (bodyElement)
            bodyElement.classList.remove('dark-theme');
    }, [isDarkTheme])

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className="toggle-theme" onClick={handleToggleTheme}>
            {isDarkTheme ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </div>
    );
};

export default ThemeToggle;
