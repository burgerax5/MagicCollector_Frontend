import { Suspense } from 'react'
import FilterBar from '../components/FilterComponents/FilterBar'
import CardSkeletons from '../components/Skeletons/CardSkeletons'
import '../styles/cards.css'

const AllCardsPage = () => {
    return (
        <div className="content-wrapper">
            <h1>Cards</h1>
            <FilterBar />
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    <CardSkeletons />
                </Suspense>
            </div>
        </div>
    )
}

export default AllCardsPage