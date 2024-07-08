import Dropdown from "./Dropdown"
import Search from "./Search"

const FilterBar = () => {
    const editionOptions = [{ name: "All Editions", value: "all" }, { name: "3rd Edition", value: 1 }, { name: "4th Edition", value: 2 }, { name: "5th Edition", value: 3 }]

    return (
        <div className="filter-bar">
            <Search />
            <Dropdown name="editionId" options={editionOptions} />
        </div>
    )
}

export default FilterBar