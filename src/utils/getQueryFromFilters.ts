import { Filters, Pagination } from "../models/Filters/IFilter";

type filters = Filters & Pagination

const getQueryFromFilters = (filters: filters) => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach(key => {
        const value = filters[key as keyof filters];
        if (value && key !== 'totalPages')
            params.set(
                key === 'currentPage' ? 'page' : key,
                value.toString());
    })

    return params
}

export default getQueryFromFilters;