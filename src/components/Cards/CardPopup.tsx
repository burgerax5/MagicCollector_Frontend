import { CardDTO } from '../../models/Cards/CardDTO'
import { useState, useEffect } from 'react'
import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO'
import getCardDetailedDTO from '../../api/cards/getCardDetailedDTO'
import ButtonGroup from './ButtonGroup'

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
                <div className="card-price-details">
                    <div className="card-detail-labels">
                        <div className="card-detail-label">Condition</div>
                        <div className="card-detail-label">Stock</div>
                        <div className="card-detail-label">Price</div>
                        <div className="card-detail-label">Qty Owned</div>
                    </div>
                    {cardDetailedDTO &&
                        cardDetailedDTO.cardConditions.map(condition => (
                            <div className="card-condition-row" key={condition.condition}>
                                <div className="card-condition">{condition.condition}</div>
                                <div className="card-quantity"> {condition.quantity}</div>
                                <div className="card-price">${condition.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                <ButtonGroup />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CardPopup