import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/rootReducer'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import '../../styles/pagination.css'
import { useState } from 'react'

interface Props {
    currentPage: number,
    setCurrentPage: (page: number) => void
}

const Pagination = ({ currentPage, setCurrentPage }: Props) => {
    const { totalPages } = useSelector((state: RootState) => state.queries);
    const [pageInput, setPageInput] = useState<number>(currentPage);

    const handleChangePage = (page: number) => {
        if (isValidPage(page))
            setCurrentPage(page);
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

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageInput(e.target.value ? parseInt(e.target.value) : 1);
    }

    const handlePageInputButton = () => {
        handleChangePage(pageInput);
    }

    return (
        <div className="pagination">
            <ul className="pagination-buttons">
                <li>
                    <button
                        className="page-btn"
                        type="button"
                        disabled={!isValidPage(currentPage - 1)}
                        onClick={() => handleChangePage(currentPage - 1)}>
                        <FaChevronLeft />
                    </button>
                </li>

                {generatePageNumbers().map((page, index) => (
                    <li key={`li-${index}`}>
                        {page === "..." ?
                            <button
                                key={index}
                                type="button"
                                disabled
                                className="page-ellipsis">
                                {page}
                            </button> :
                            <button
                                key={index}
                                type="button"
                                className={page === currentPage ? "page-btn active" : "page-btn"}
                                onClick={() => {
                                    typeof page === 'number' && handleChangePage(page)
                                }}>
                                {page}
                            </button>}
                    </li>
                ))}

                <li>
                    <button
                        className="page-btn"
                        type="button"
                        disabled={!isValidPage(currentPage + 1)}
                        onClick={() => handleChangePage(currentPage + 1)}>
                        <FaChevronRight />
                    </button>
                </li>
            </ul>
            <div className="page-input-section">
                <label htmlFor="page-input">Page</label>
                <input id="page-input" type="number" onChange={handlePageInputChange} value={pageInput} />
                <button onClick={handlePageInputButton}>Go</button>
            </div>
        </div>
    )
}

export default Pagination