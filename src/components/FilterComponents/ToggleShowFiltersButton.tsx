import { FiFilter } from "react-icons/fi"

interface Props {
    mobileShow: boolean,
    setMobileShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ToggleShowFiltersButton = ({ mobileShow, setMobileShow }: Props) => {

    const handleClick = () => {
        setMobileShow(!mobileShow);
    }

    return (
        <button className={mobileShow ? "toggle-filters-btn show" : "toggle-filters-btn"} type="button" onClick={handleClick}>
            <FiFilter />
        </button>
    )
}

export default ToggleShowFiltersButton