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

const sortOptions = [
    { name: "Name (A-Z)", value: "name_asc" },
    { name: "Name (Z-A)", value: "name_desc" },
    { name: "Price (Low to High)", value: "price_asc" },
    { name: "Price (High to Low)", value: "price_desc" },
    { name: "Rarity (Low to High)", value: "rarity_asc" },
    { name: "Rarity (High to Low)", value: "rarity_desc" }];

const foilOptions = [
    { name: "Any", value: "any" },
    { name: "Foils Only", value: "foils_only" },
    { name: "Hide Foils", value: "hide_foils" }];

const FilterBar = () => {
    const [filters, setFilters] = useState<Filters>(initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(filters)
    }

    return (
        <form className="filter-bar" onSubmit={submitSearch} ref={formRef}>
            <Search filters={filters} setFilters={setFilters} />
            <Dropdown label="Edition" name="editionId" options={editionOptions} setFilters={setFilters} />
            <Dropdown label="Sort By" name="sortBy" options={sortOptions} setFilters={setFilters} />
            <Dropdown label="Show Foil" name="foilFilter" options={foilOptions} setFilters={setFilters} />
        </form>
    )
}

export default FilterBar