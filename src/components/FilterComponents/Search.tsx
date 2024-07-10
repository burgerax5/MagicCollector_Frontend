import { IoIosSearch } from "react-icons/io";
import '../../styles/filters.css'

interface Props {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ search, setSearch }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="search-wrapper">
            <label htmlFor="search">Card Name</label>
            <div className="search-bar">
                <input id="search" value={search} onChange={handleChange} placeholder={`Search for a card...`} />
                <button>
                    <IoIosSearch />
                </button>
            </div>
        </div>
    )
}

export default Search