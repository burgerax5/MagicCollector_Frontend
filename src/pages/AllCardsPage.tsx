import { Suspense, useEffect, useState } from 'react'
import getCardsInPage from '../api/cards/getCards'
import FilterBar from '../components/FilterComponents/FilterBar'
import CardSkeletons from '../components/Skeletons/CardSkeletons'
import { CardPageDTO } from '../models/Cards/CardPageDTO'
import '../styles/cards.css'
import { useSearchParams } from "react-router-dom"
import Pagination from '../components/Pagination/Pagination'
import Card from '../components/Cards/Card'
import { useDispatch, useSelector } from 'react-redux'
import { SetFilter, SetTotalPagesAction } from '../redux/actions/actions'
import getResultsRange from '../utils/getResultsRange'
import { RootState } from '../redux/reducers/rootReducer'
import { SET_CURRENT_PAGE } from '../redux/actions/actionTypes'

const AllCardsPage = () => {
    const [cardPageDTO, setCardPageDTO] = useState<CardPageDTO | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector((state: RootState) => state.queries);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                let page = await getCardsInPage(searchParams.toString());
                setCardPageDTO(page);
            } catch (error) {
                console.error("Error occurred while retrieving cards: ", error);
            }
        };

        fetchCards();
        console.log("we innit")
    }, []);

    useEffect(() => {
        if (cardPageDTO) {
            const totalPages = cardPageDTO.total_pages;
            dispatch(SetTotalPagesAction(totalPages));

            const samePage = currentPage === cardPageDTO?.curr_page;
            if (!samePage && !isNaN(cardPageDTO.curr_page))
                SetFilter(SET_CURRENT_PAGE, cardPageDTO.curr_page);
        }
    }, [cardPageDTO])

    const setCurrentPage = (page: number) => {
        dispatch(SetFilter(SET_CURRENT_PAGE, page));
    }

    const { startRange, endRange } = getResultsRange(currentPage, 50, cardPageDTO?.results);

    return (
        <div className="content-wrapper">
            <h1>Cards</h1>
            <FilterBar setSearchParams={setSearchParams} searchParams={searchParams} />
            {cardPageDTO && <div className="card-results">
                Results: {startRange?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}-{endRange?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} of {cardPageDTO?.results?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    {cardPageDTO?.results ?
                        cardPageDTO.cardDTOs.map(cardDTO => (
                            <Card key={"card-" + cardDTO.id} card={cardDTO} />
                        )) :
                        <h2>No results</h2>}
                </Suspense>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default AllCardsPage