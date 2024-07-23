import Dropdown from "./Dropdown"
import Search from "./Search"
import { useState, useEffect } from "react"
import { Filters } from "../../models/Filters/IFilter"
import ToggleShowFiltersButton from "./ToggleShowFiltersButton"
import { SortBy } from "../../models/Filters/ISortBy"
import { FoilFilter } from "../../models/Filters/IFoilFilter"
import { SetURLSearchParams, useLocation } from "react-router-dom"
import getEditionsDropdown from "../../api/editions/getEditionsDropdown"
import { isValidToken } from "../../utils/checkAuthenticated"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/reducers/rootReducer"
import { SetEditionsDropdownAction } from "../../redux/actions/actions"

const initialState: Filters = {
    search: "",
    editionId: 0,
    sortBy: "name_asc",
    foilFilter: "any"
}

const sortOptions = [
    { name: "Default", value: "" },
    { name: "Price (Low to High)", value: "price_asc" },
    { name: "Price (High to Low)", value: "price_desc" },
    { name: "Rarity (Low to High)", value: "rarity_asc" },
    { name: "Rarity (High to Low)", value: "rarity_desc" }];

const foilOptions = [
    { name: "Any", value: "any" },
    { name: "Foils Only", value: "foils_only" },
    { name: "Hide Foils", value: "hide_foils" }];

interface Props {
    setSearchParams: SetURLSearchParams
    searchParams: URLSearchParams
}


const FilterBar = ({ setSearchParams, searchParams }: Props) => {
    const [localFilters, setLocalFilters] = useState<Filters>(initialState);
    const [tempSearch, setTempSearch] = useState(""); // Search bar uses this, but on submit sets filters.search equal to this
    const [mobileShow, setMobileShow] = useState(false);

    const editionOptions = useSelector((root: RootState) => root.editions);
    const filters = useSelector((root: RootState) => root.queries);

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(filters)
    }

    useEffect(() => {
        console.log(searchParams)
    }, [searchParams, setSearchParams])

    return (
        <form className="filter-bar" onSubmit={submitSearch}>
            <div className="filter-bar-main">
                <Search
                    search={tempSearch}
                    setSearch={setTempSearch} />

                <ToggleShowFiltersButton
                    mobileShow={mobileShow}
                    setMobileShow={setMobileShow} />
            </div>
            <div className={mobileShow ? "filter-bar-secondary show" : "filter-bar-secondary"}>
                <Dropdown
                    label="Edition"
                    name="editionId"
                    options={editionOptions}
                    setFilters={setLocalFilters}
                    selectedValue={localFilters.editionId.toString()} />

                <Dropdown
                    label="Sort By"
                    name="sortBy"
                    options={sortOptions}
                    setFilters={setLocalFilters}
                    selectedValue={localFilters.sortBy} />

                <Dropdown
                    label="Show Foil"
                    name="foilFilter"
                    options={foilOptions}
                    setFilters={setLocalFilters}
                    selectedValue={localFilters.foilFilter} />
            </div>
        </form>
    )
}

export default FilterBar