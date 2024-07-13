import { CardDTO } from '../../models/Cards/CardDTO'
import { useState } from 'react'
import Modal from '../Modal';
import CardPopup from './CardPopup';

interface Props {
    card: CardDTO
}

const Card = ({ card }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleCardClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
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