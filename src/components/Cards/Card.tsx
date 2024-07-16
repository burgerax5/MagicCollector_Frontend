import { CardDTO } from '../../models/Cards/CardDTO'
import { useEffect, useState } from 'react'
import Modal from '../Modal';
import CardPopup from './CardPopup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { ResetCardsOwnedAction, SetTotalCardsAction, SetTotalValueAction } from '../../redux/actions/actions';
import { isAdded, isDeleted, isUpdated } from '../../utils/updateCardsOwned';
import { addCardOwned, deleteCardOwned, getCollectionDetails, updateCardOwned } from '../../api/mycards/myCards';
import addCommasToNumber from '../../utils/addCommasToNumber';
import { getUsername } from '../../utils/checkAuthenticated';

interface Props {
    card: CardDTO
}

const Card = ({ card }: Props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const dispatch = useDispatch();
    const cardsOwned = useSelector((state: RootState) => state.cardsOwned);

    const handleCardClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        // Get conditions that were added/updated/deleted
        const addedConditions = isAdded(cardsOwned.old, cardsOwned.new);
        const updatedConditions = isUpdated(cardsOwned.old, cardsOwned.new);
        const deletedConditions = isDeleted(cardsOwned.old, cardsOwned.new);

        // Make API calls
        addedConditions.map(async (co) => {
            await addCardOwned(co);
            setIsChanged(true);
        });
        updatedConditions.map(async (co) => {
            await updateCardOwned(co);
            setIsChanged(true);
        });
        deletedConditions.map(async (co) => {
            await deleteCardOwned(co.id ?? 0);
            setIsChanged(true);
        });

        setShowPopup(false);
        dispatch(ResetCardsOwnedAction());
    };

    useEffect(() => {
        const userParam = new URLSearchParams(location.search).get("user");
        const username = userParam !== null && userParam !== "" ? userParam : getUsername();

        if (username && isChanged) {
            (async () => {
                const details = await getCollectionDetails(username);
                console.log(details)
                dispatch(SetTotalCardsAction(details.totalCards));
                dispatch(SetTotalValueAction(details.totalValue));
                setIsChanged(false);
            })();
        }
    }, [isChanged])

    return (
        <div className="card-wrapper">
            <div className="card" onClick={handleCardClick}>
                <div className="card-edition">{card.editionName}</div>
                <div className="card-image-wrapper">
                    {card.isFoil && <div className="foil-cover"></div>}
                    <img loading='lazy' src={"https://" + card.imageURL} alt={card.name} />
                </div>
                <div>
                    <div className="card-name">{card.name}</div>
                    <div className="card-price">
                        ${addCommasToNumber(card.nmPrice)}
                    </div>
                </div>
            </div>

            <Modal show={showPopup} onClose={handleClosePopup}>
                <CardPopup card={card} />
            </Modal>
        </div>
    )
}

export default Card