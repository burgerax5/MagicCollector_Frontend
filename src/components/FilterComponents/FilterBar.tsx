import Dropdown from "./Dropdown"
import Search from "./Search"
import { useState, useEffect } from "react"
import ToggleShowFiltersButton from "./ToggleShowFiltersButton"
import { SetURLSearchParams } from "react-router-dom"
import getEditionsDropdown from "../../api/editions/getEditionsDropdown"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/reducers/rootReducer"
import { ReplaceFilter, SetEditionsDropdownAction } from "../../redux/actions/actions"
import getQueryFromFilters from "../../utils/getQueryFromFilters"
import getFiltersFromQuery from "../../utils/getFiltersFromQuery"

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
    searchParams: URLSearchParams,
}


const FilterBar = ({ setSearchParams, searchParams }: Props) => {
    const [tempSearch, setTempSearch] = useState(""); // Search bar uses this, but on submit sets filters.search equal to this
    const [mobileShow, setMobileShow] = useState(false);

    const dispatch = useDispatch();
    const editionOptions = useSelector((root: RootState) => root.editions);
    const filters = useSelector((root: RootState) => root.queries);
    const [lastSeenPage, setLastSeenPage] = useState(filters.currentPage);

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const queryParams = getQueryFromFilters({ ...filters, search: tempSearch });
        setSearchParams(queryParams);
    }

    useEffect(() => {
        const fetchEditionDropdown = async () => {
            const editionsDropdown = await getEditionsDropdown();
            dispatch(SetEditionsDropdownAction([{ name: "All Editions", value: 0 }, ...editionsDropdown]));
        };

        fetchEditionDropdown();
    }, [])

    useEffect(() => {
        const newFilters = getFiltersFromQuery();
        dispatch(ReplaceFilter(newFilters));
    }, [searchParams])

    useEffect(() => {
        if (lastSeenPage !== filters.currentPage) {
            const queryParams = getQueryFromFilters({ ...filters, search: tempSearch });
            setSearchParams(queryParams);
            console.log(queryParams.get('page'));
            setLastSeenPage(filters.currentPage);
        }
    }, [filters.currentPage])

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
                    selectedValue={filters.editionId.toString()} />

                <Dropdown
                    label="Sort By"
                    name="sortBy"
                    options={sortOptions}
                    selectedValue={filters.sortBy} />

                <Dropdown
                    label="Show Foil"
                    name="foilFilter"
                    options={foilOptions}
                    selectedValue={filters.foilFilter} />
            </div>
            <button type="submit" className="apply-filters-btn">
                Apply Filters
            </button>
        </form>
    )
}

export default FilterBar