import { CardDTO } from '../../models/Cards/CardDTO'
import { useState, useEffect } from 'react'
import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO'
import getCardDetailedDTO from '../../api/cards/getCardDetailedDTO'

interface Props {
    card: CardDTO
}

const CardPopup = ({ card }: Props) => {
    const [cardDetailedDTO, setCardDetailedDTO] = useState<CardDetailedDTO | null>(null);
    const rarities = ["Common", "Uncommon", "Rare", "Mythic Rare"]

    useEffect(() => {
        (async () => {
            const dto = await getCardDetailedDTO(card.id);
            setCardDetailedDTO(dto);
        })();
    }, []);

    return (
        <div className="popup-content">
            <img className="card-image-large" src={"https://" + card.imageURL} alt={card.name} />
            <div className="card-details-wrapper">
                <div className="card-basic-details">
                    <h2>{card.name}</h2>
                    <div className="card-edition"><b>Edition: </b>{card.editionName}</div>
                    <div className="card-rarity"><b>Rarity: </b>{rarities[card.rarity]}</div>
                </div>
                <div className="card-disclaimer">All data sourced from CardKingdom</div>
                <ul className="card-price-details">
                    {cardDetailedDTO &&
                        cardDetailedDTO.cardConditions.map(condition => (
                            <li className="card-condition" key={condition.condition}>
                                {condition.condition}:
                                <span className="card-quantity"> {condition.quantity} @</span>
                                <span className="card-price"> ${condition.price}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default CardPopup