import Dropdown from "./Dropdown"
import Search from "./Search"
import { useState, useRef, useEffect } from "react"
import { Filters } from "../../models/Filters/IFilter"
import ToggleShowFiltersButton from "./ToggleShowFiltersButton"
import { SortBy } from "../../models/Filters/ISortBy"
import { FoilFilter } from "../../models/Filters/IFoilFilter"
import { SetURLSearchParams, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/reducers/rootReducer"
import { SetFilterAction } from "../../redux/actions/actions"

const initialState: Filters = {
    search: "",
    sortBy: "name_asc",
    foilFilter: "any"
}

const editionOptions = [
    { name: "All Editions", value: "all" },
    { name: "3rd Edition", value: 1 },
    { name: "4th Edition", value: 2 },
    { name: "5th Edition", value: 3 }
]

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

interface Props {
    setSearchParams: SetURLSearchParams
}


const FilterBar = ({ setSearchParams }: Props) => {
    const [localFilters, setLocalFilters] = useState<Filters>(initialState);
    const { filters } = useSelector((state: RootState) => state.queries);
    const dispatch = useDispatch();

    const [mobileShow, setMobileShow] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const location = useLocation();

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(filters);
    }

    useEffect(() => {
        dispatch(SetFilterAction(localFilters));
    }, [localFilters])

    // Parse query parameters from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilters = { ...initialState };
        params.forEach((value, key) => {
            switch (key) {
                case "search": newFilters[key] = value; break;
                case "editionId": newFilters[key] = parseInt(value); break;
                case "sortBy": newFilters[key] = value as SortBy; break;
                case "foilFilter": newFilters[key] = value as FoilFilter; break;
            }
        })

        dispatch(SetFilterAction(newFilters));
    }, []);

    // Update the URL query parameters whenever filters change
    useEffect(() => {
        const params = new URLSearchParams();
        Object.keys(localFilters).forEach(key => {
            const value = localFilters[key as keyof Filters];
            if (value)
                params.set(key, value.toString());
        });
        setSearchParams(params);

    }, [localFilters]);

    return (
        <form className="filter-bar" onSubmit={submitSearch} ref={formRef}>
            <div className="filter-bar-main">
                <Search
                    filters={localFilters}
                    setFilters={setLocalFilters} />

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
                    selectedValue={filters.editionId?.toString()} />

                <Dropdown
                    label="Sort By"
                    name="sortBy"
                    options={sortOptions}
                    setFilters={setLocalFilters}
                    selectedValue={filters.sortBy} />

                <Dropdown
                    label="Show Foil"
                    name="foilFilter"
                    options={foilOptions}
                    setFilters={setLocalFilters}
                    selectedValue={filters.foilFilter} />
            </div>
        </form>
    )
}

export default FilterBar