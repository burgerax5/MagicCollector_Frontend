import { useEffect, useRef, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { Filters } from "../../models/Filters/IFilter"

interface Props<T> {
    name: string,
    options: T[],
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const Dropdown = ({ name, options, setFilters }: Props<{
    name: string,
    value: number | string
}>) => {

    const [selectedValue, setSelectedValue] = useState<number | string>(options[0]?.value || 0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let editionId = parseInt(e.target.value);
        setSelectedValue(editionId);
        setFilters(prevFilters => ({ ...prevFilters, editionId }));
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
        <div className="dropdown-container" ref={dropdownRef} onClick={toggleDropdown}>
            <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            <select name={name} value={selectedValue} className="custom-dropdown" onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value} className="custom-option">
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown