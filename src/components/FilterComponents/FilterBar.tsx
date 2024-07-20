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
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    username?: string,
    searchParams: URLSearchParams
}


const FilterBar = ({ setSearchParams, currentPage, setCurrentPage, username, searchParams }: Props) => {
    const [localFilters, setLocalFilters] = useState<Filters>(initialState);
    const [tempSearch, setTempSearch] = useState(""); // Search bar uses this, but on submit sets localFilters.search equal to this
    const [mobileShow, setMobileShow] = useState(false);

    const [flag, setFlag] = useState(true); // Flag to indicate whether or not to update local filters

    const location = useLocation();
    const dispatch = useDispatch();

    const editionOptions = useSelector((root: RootState) => root.editions);

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        setLocalFilters(prevFilters => ({ ...prevFilters, search: tempSearch }));
        updateURL();
    }

    const updateURL = () => {
        const params = new URLSearchParams();

        if (isValidToken())
            params.set("user", username ?? "");

        Object.keys(localFilters).forEach(key => {
            const value = localFilters[key as keyof Filters];
            if (value)
                params.set(key, value.toString());
        });
        params.set("page", currentPage.toString());

        setSearchParams(params);
    }

    const resetPage = () => {
        setCurrentPage(1);
    }

    const updateFiltersFromURL = () => {
        const params = new URLSearchParams(location.search);
        const newFilters = { ...initialState };
        params.forEach((value, key) => {
            switch (key) {
                case "search": newFilters[key] = value; break;
                case "editionId":
                    if (!isNaN(parseInt(value)) && parseInt(value))
                        newFilters[key] = parseInt(value);
                    break;
                case "sortBy": newFilters[key] = value as SortBy; break;
                case "foilFilter": newFilters[key] = value as FoilFilter; break;
                case "page": setCurrentPage(!isNaN(parseInt(value)) ? parseInt(value) : 1);
            }
        })

        console.log(params.get("editionId"))
        if (!params.get("editionId")) newFilters.editionId = 0;

        console.log(newFilters)

        setLocalFilters(newFilters);
    }

    // Parse query parameters from URL
    useEffect(() => {
        (async () => {
            const editionsDropdown = await getEditionsDropdown();
            dispatch(SetEditionsDropdownAction([{ name: "All Editions", value: 0 }, ...editionsDropdown]));
        })();

        updateFiltersFromURL();
    }, []);

    useEffect(() => {
        if (!searchParams.size) {
            console.log("PP!")
            setFlag(false)
            updateFiltersFromURL();
            setFlag(true)
        }
    }, [searchParams])

    // Update the URL query parameters whenever filters change
    useEffect(() => {
        console.log(flag)
        if (flag) updateURL();
    }, [currentPage, localFilters]);

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
                    resetPage={resetPage}
                    label="Edition"
                    name="editionId"
                    options={editionOptions}
                    setFilters={setLocalFilters}
                    selectedValue={localFilters.editionId.toString()} />

                <Dropdown
                    resetPage={resetPage}
                    label="Sort By"
                    name="sortBy"
                    options={sortOptions}
                    setFilters={setLocalFilters}
                    selectedValue={localFilters.sortBy} />

                <Dropdown
                    resetPage={resetPage}
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