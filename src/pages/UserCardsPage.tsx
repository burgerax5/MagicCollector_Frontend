import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getCardsOwned } from '../api/mycards/myCards';
import Card from '../components/Cards/Card';
import FilterBar from '../components/FilterComponents/FilterBar';
import Pagination from '../components/Pagination/Pagination';
import CardSkeletons from '../components/Skeletons/CardSkeletons';
import { CardOwnedResponseDTO } from '../models/UserCards/CardOwnedResponseDTO';
import '../styles/usercards.css'
import getResultsRange from '../utils/getResultsRange';
import { useDispatch } from 'react-redux';
import { SetTotalCardsAction, SetTotalPagesAction, SetTotalValueAction } from '../redux/actions/actions';
import { getUsername } from '../utils/checkAuthenticated';
import CollectionDetails from '../components/UserCards/CollectionDetails';
import addCommasToNumber from '../utils/addCommasToNumber';


const MyCardsPage = () => {
    const [cardsOwnedPage, setCardsOwnedPage] = useState<CardOwnedResponseDTO | undefined>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState<string | null>(getUsername());
    const [currentPage, setCurrentPage] = useState(1);
    const params = new URLSearchParams(location.search);

    const dispatch = useDispatch();

    const fetchCards = async () => {
        let data = await getCardsOwned(user + "?" + searchParams.toString());
        setCardsOwnedPage(data);
    }

    useEffect(() => {
        fetchCards();
    }, [searchParams]);

    const getUserCards = async () => {
        let username: string | undefined;

        // Obtain the username from the URL
        params.forEach((value, key) => {
            if (key === "user" && value.length > 0) {
                username = value
                setUser(username);
            } else if (key === "user") {
                setUser(getUsername());
            }
        })

        // Try get the user's cards
        try {
            const data = await getCardsOwned(username ?? "");
            setCardsOwnedPage(data);
            dispatch(SetTotalPagesAction(data.cardPageDTO.total_pages));
        } catch (error) {
            console.error(error);
            dispatch(SetTotalPagesAction(0));
        }
    }

    useEffect(() => {
        getUserCards();
    }, []);

    useEffect(() => {
        if (cardsOwnedPage) {
            dispatch(SetTotalCardsAction(cardsOwnedPage.totalCardsOwned));
            dispatch(SetTotalValueAction(cardsOwnedPage.estimatedValue));
        }
    }, [cardsOwnedPage]);

    const { startRange, endRange } = getResultsRange(currentPage, 50, cardsOwnedPage?.cardPageDTO?.results);

    return (
        <div className="content-wrapper">
            {user !== null ?
                <>
                    <h1>{user}'s Collection</h1>
                    <CollectionDetails />
                    <FilterBar setSearchParams={setSearchParams} searchParams={searchParams} />
                    {cardsOwnedPage?.cardPageDTO &&
                        <div className="card-results">
                            Results: {addCommasToNumber(startRange ?? 0)}-{addCommasToNumber(endRange ?? 0)} of {addCommasToNumber(cardsOwnedPage.cardPageDTO.results)}
                        </div>}

                    <div className="card-grid">
                        <Suspense fallback={<CardSkeletons />}>
                            {cardsOwnedPage ?
                                cardsOwnedPage.cardPageDTO.cardDTOs.map(cardDTO => (
                                    <Card key={"card-" + cardDTO.id} card={cardDTO} hideDeleted={true} />
                                )) :
                                <h2>No results</h2>}
                        </Suspense>
                    </div>

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
                :
                <h1>User: {user} not found</h1>}
        </div>
    )
}

export default MyCardsPage