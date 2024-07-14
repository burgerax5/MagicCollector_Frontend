import { CardDTO } from '../../models/Cards/CardDTO'
import { useState } from 'react'
import Modal from '../Modal';
import CardPopup from './CardPopup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { ResetCardsOwnedAction } from '../../redux/actions/actions';

interface Props {
    card: CardDTO
}

const Card = ({ card }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const cardsOwned = useSelector((state: RootState) => state.cardsOwned);

    const handleCardClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        console.log(cardsOwned)
        setShowPopup(false);
        dispatch(ResetCardsOwnedAction());
    };

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
                        ${card.nmPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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