import { useEffect, useRef, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { Filters } from "../../models/Filters/IFilter"
import { FoilFilter } from "../../models/Filters/IFoilFilter"
import { SortBy } from "../../models/Filters/ISortBy"

interface Props<T> {
    label: string,
    name: string,
    options: T[],
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const Dropdown = ({ label, name, options, setFilters }: Props<{
    name: string,
    value: number | string
}>) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // If the dropdown is for editionId convert to integer
        if (name === "editionId") {
            let editionId = parseInt(e.target.value); // If "All Editions" is selected, editionId is undefined
            setFilters(prevFilters => ({ ...prevFilters, editionId: isNaN(editionId) ? undefined : editionId }));
        }
        else if (name === "sortBy") {
            let sortBy = e.target.value as SortBy;
            setFilters(prevFilters => ({ ...prevFilters, sortBy }))
        }
        // Otherwise, it is a dropdown for foil filter
        else if (name === "foilFilter") {
            let foilFilter = e.target.value as FoilFilter;
            setFilters(prevFilters => ({ ...prevFilters, foilFilter }));
        }
    }

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
                <select id={`${name}-dropdown`} name={name} className="custom-dropdown" onChange={handleChange}>
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