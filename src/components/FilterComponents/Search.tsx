import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import '../../styles/filters.css'
import { Filters } from '../../models/Filters/IFilter';

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const Search = ({ setFilters }: Props) => {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setFilters(prevFilters => ({ ...prevFilters, search: e.target.value }));
    }

    return (
        <div className="search-bar">
            <input value={search} onChange={handleChange} placeholder={`Search for a card...`} />
            <button>
                <IoIosSearch />
            </button>
        </div>
    )
}

export default Search