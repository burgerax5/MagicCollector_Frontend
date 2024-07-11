import { useEffect, useRef, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { Filters } from "../../models/Filters/IFilter"

interface Props<T> {
    label: string,
    name: string,
    options: T[],
    setFilters: React.Dispatch<React.SetStateAction<Filters>>,
    selectedValue?: string,
    resetPage: () => void;
}

const Dropdown = ({ label, name, options, setFilters, selectedValue, resetPage }: Props<{
    name: string,
    value: number | string
}>) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const isValidEditionId = !isNaN(parseInt(e.target.value));

        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [name]: name === "editionId" && !isValidEditionId ? undefined : e.target.value
        }));

        resetPage();
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