import { IoIosSearch } from "react-icons/io";
import '../../styles/filters.css'
import { Filters } from '../../models/Filters/IFilter';

interface Props {
    filters: Filters,
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const Search = ({ filters, setFilters }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prevFilters => ({ ...prevFilters, search: e.target.value }));
    }

    return (
        <div className="search-wrapper">
            <label htmlFor="search">Card Name</label>
            <div className="search-bar">
                <input id="search" value={filters.search} onChange={handleChange} placeholder={`Search for a card...`} />
                <button>
                    <IoIosSearch />
                </button>
            </div>
        </div>
    )
}

export default Search