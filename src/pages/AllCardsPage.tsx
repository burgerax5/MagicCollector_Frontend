import { Suspense, useEffect, useState } from 'react'
import getCardsInPage from '../api/cards/getCards'
import FilterBar from '../components/FilterComponents/FilterBar'
import CardSkeletons from '../components/Skeletons/CardSkeletons'
import { CardPageDTO } from '../models/Cards/CardPageDTO'
import '../styles/cards.css'
import { useSearchParams } from "react-router-dom"
import Pagination from '../components/Pagination/Pagination'
import Card from '../components/Cards/Card'
import { useDispatch } from 'react-redux'
import { SetTotalPagesAction } from '../redux/actions/actions'

const AllCardsPage = () => {
    const [cardPageDTO, setCardPageDTO] = useState<CardPageDTO | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let page = await getCardsInPage(searchParams.toString());
            setCardPageDTO(page);
        })();
    }, [searchParams]);

    useEffect(() => {
        const totalPages = cardPageDTO?.total_pages;
        dispatch(SetTotalPagesAction(totalPages ?? 0));
    }, [cardPageDTO])

    return (
        <div className="content-wrapper">
            <h1>Cards</h1>
            <FilterBar setSearchParams={setSearchParams} />
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    {cardPageDTO ?
                        cardPageDTO.cardDTOs.map(cardDTO => (
                            <Card card={cardDTO} />
                        )) :
                        <h2>No results</h2>}
                </Suspense>
            </div>
            <Pagination />
        </div>
    )
}

export default AllCardsPage