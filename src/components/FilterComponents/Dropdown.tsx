import { useEffect, useRef, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { SetFilter } from "../../redux/actions/actions"
import { SET_EDITION_FILTER, SET_FOIL_FILTER, SET_SORTING_FILTER } from "../../redux/actions/actionTypes"

interface Props<T> {
    label: string,
    name: string,
    options: T[],
    selectedValue?: string,
}

const Dropdown = ({ label, name, options, selectedValue }: Props<{
    name: string,
    value: number | string
}>) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const isValidEditionId = !isNaN(parseInt(e.target.value)) && parseInt(e.target.value);

        switch (name) {
            case "editionId":
                const editionId = !isValidEditionId ? 0 : e.target.value;
                dispatch(SetFilter(SET_EDITION_FILTER, editionId));
                break;
            case "sortBy":
                dispatch(SetFilter(SET_SORTING_FILTER, e.target.value));
                break;
            case "foilFilter":
                dispatch(SetFilter(SET_FOIL_FILTER, e.target.value));
                break;
            default:
                break;
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
            setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown-wrapper">
            <label htmlFor={`${name}-dropdown`}>{label}</label>
            <div className="dropdown-container" ref={dropdownRef} onClick={toggleDropdown}>
                <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
                <select id={`${name}-dropdown`} name={name} className="custom-dropdown" onChange={handleChange} value={selectedValue}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} className="custom-option">
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Dropdown