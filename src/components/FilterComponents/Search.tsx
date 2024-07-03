import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import '../../styles/filters.css'

const Search = () => {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(search);
    }

    return (
        <form className="search-bar" onSubmit={submitSearch}>
            <button>
                <IoIosSearch />
            </button>
            <input value={search} onChange={handleChange} placeholder="Search for a set..." />
        </form>
    )
}

export default Search