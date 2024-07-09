import { Suspense, useEffect, useState } from 'react'
import getCardsInPage from '../api/cards/getCards'
import FilterBar from '../components/FilterComponents/FilterBar'
import CardSkeletons from '../components/Skeletons/CardSkeletons'
import { CardPageDTO } from '../models/Cards/CardPageDTO'
import '../styles/cards.css'
import { useSearchParams } from "react-router-dom"

const AllCardsPage = () => {
    const [cardPageDTO, setCardPageDTO] = useState<CardPageDTO | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            let page = await getCardsInPage(searchParams.toString());
            setCardPageDTO(page);
        })();
    }, []);

    return (
        <div className="content-wrapper">
            <h1>Cards</h1>
            <FilterBar setSearchParams={setSearchParams} />
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    <CardSkeletons />
                </Suspense>
            </div>
        </div>
    )
}

export default AllCardsPage