import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getCardsOwned } from '../api/mycards/myCards';
import Card from '../components/Cards/Card';
import FilterBar from '../components/FilterComponents/FilterBar';
import Pagination from '../components/Pagination/Pagination';
import CardSkeletons from '../components/Skeletons/CardSkeletons';
import { CardOwnedResponseDTO } from '../models/MyCards/CardOwnedResponseDTO';
import '../styles/mycards.css'


const MyCardsPage = () => {
    const [cardsOwned, setCardsOwned] = useState<CardOwnedResponseDTO | undefined>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        (async () => {
            let username: string | undefined;

            params.forEach((value, key) => {
                if (key === "user") {
                    username = value
                    setUser(username);
                }
            })

            try {
                const data = await getCardsOwned(username ?? "");
                console.log(data);
                setCardsOwned(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        console.log(cardsOwned)
    }, [cardsOwned]);

    return (
        <div className="content-wrapper">
            <h1>{user ?? "BRUH"}'s Collection</h1>
            <div className="collection-details">
                <div className="total-cards">
                    <div>Total Cards</div>
                    <div className="count">{cardsOwned?.totalCardsOwned}</div>
                </div>
                <div className="total-value">
                    <div>Estimated Value</div>
                    <div className="price">${cardsOwned?.estimatedValue}</div>
                </div>
            </div>
            {/* <FilterBar setSearchParams={setSearchParams} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
            <div className="card-grid">
                <Suspense fallback={<CardSkeletons />}>
                    {cardsOwned ?
                        cardsOwned.cardPageDTO.cardDTOs.map(cardDTO => (
                            <Card key={"card-" + cardDTO.id} card={cardDTO} />
                        )) :
                        <h2>No results</h2>}
                </Suspense>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default MyCardsPage