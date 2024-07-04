import { Suspense } from 'react'
import CardSkeletons from '../components/Skeletons/CardSkeletons'
import '../styles/cards.css'

const AllCardsPage = () => {
    return (
        <div className="content-wrapper">
            <h1>All Cards</h1>
            {/* <Filters /> */}
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    <CardSkeletons />
                </Suspense>
            </div>
        </div>
    )
}

export default AllCardsPage