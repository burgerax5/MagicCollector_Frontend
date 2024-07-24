import { SortBy } from "../models/Filters/ISortBy";
import { FoilFilter } from "../models/Filters/IFoilFilter";

const initialState = {
    search: "",
    editionId: 0,
    sortBy: "name_asc",
    foilFilter: "any",
    currentPage: 1
}

const getFiltersFromQuery = () => {
    const params = new URLSearchParams(location.search);

    let newFilters = { ...initialState };

    params.forEach((value, key) => {
        switch (key) {
            case "search": newFilters[key] = value; break;
            case "editionId":
                if (!isNaN(parseInt(value)) && parseInt(value))
                    newFilters[key] = parseInt(value);
                break;
            case "sortBy": newFilters[key] = value as SortBy; break;
            case "foilFilter": newFilters[key] = value as FoilFilter; break;
            case "page": newFilters.currentPage = parseInt(value); break;
        }
    })

    return newFilters;
}

export default getFiltersFromQuery;