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

    return (
        <div>
            <button
                type="button"
                disabled={!isValidPage(currentPage - 1)}
                onClick={() => handleChangePage(currentPage - 1)}>
                <FaChevronLeft />
            </button>

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