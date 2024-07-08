import Dropdown from "./Dropdown"
import Search from "./Search"
import { useState, useRef } from "react"
import { Filters } from "../../models/Filters/IFilter"

const initialState: Filters = {
    search: "",
    sortBy: "name_asc",
    foilFilter: "any"
}

const editionOptions = [{ name: "All Editions", value: "all" }, { name: "3rd Edition", value: 1 }, { name: "4th Edition", value: 2 }, { name: "5th Edition", value: 3 }]
const foilOptions = [{ name: "Any", value: "any" }, { name: "Foils Only", value: "foils_only" }, { name: "Hide Foils", value: "hide_foils" }];

const FilterBar = () => {
    const [filters, setFilters] = useState<Filters>(initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(filters)
    }

    return (
        <form className="filter-bar" onSubmit={submitSearch} ref={formRef}>
            <Search setFilters={setFilters} />
            <Dropdown label="Edition" name="editionId" options={editionOptions} setFilters={setFilters} />
            <Dropdown label="Show Foil" name="foilFilter" options={foilOptions} setFilters={setFilters} />
        </form>
    )
}

export default FilterBar