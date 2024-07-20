import { FoilFilter } from "./IFoilFilter";
import { SortBy } from "./ISortBy";

export interface Filters {
    search: string,
    editionId: number,
    sortBy: SortBy,
    foilFilter: FoilFilter
}

export interface Pagination {
    currentPage: number,
    totalPages: number,
}

export interface Queries {
    filters: Filters,
    pagination: Pagination
}