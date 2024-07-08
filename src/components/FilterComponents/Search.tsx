import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import '../../styles/filters.css'


const Search = () => {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const submitSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    return (
        <div className="search-bar">
            <button onClick={submitSearch}>
                <IoIosSearch />
            </button>
            <input value={search} onChange={handleChange} placeholder={`Search for a card...`} />
        </div>
    )
}

export default Search