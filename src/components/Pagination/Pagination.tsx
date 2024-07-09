import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/reducers/rootReducer'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { SetCurrentPageAction } from '../../redux/actions/actions'

const Pagination = () => {
    const { currentPage, totalPages } = useSelector((state: RootState) => state.queries.pagination);
    const dispatch = useDispatch();

    const handleChangePage = (page: number) => {
        if (isValidPage(page))
            dispatch(SetCurrentPageAction(page));
    }

    const isValidPage = (page: number) => page > 0 && page <= totalPages;

    const generatePageNumbers = () => {
        let pages: (number | string)[] = []

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        } else if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage > totalPages - 4) {
            pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }

        return pages;
    }

    return (
        <div>
            <button
                type="button"
                disabled={!isValidPage(currentPage - 1)}
                onClick={() => handleChangePage(currentPage - 1)}>
                <FaChevronLeft />
            </button>

            {generatePageNumbers().map((page, index) => (
                <button
                    key={index}
                    type="button"
                    className={page === currentPage ? "page-btn active" : "page-btn"}
                    onClick={() => {
                        typeof page === 'number' ? handleChangePage(page) : console.log("WIP")
                    }}>
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={!isValidPage(currentPage + 1)}
                onClick={() => handleChangePage(currentPage + 1)}>
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Pagination