import { CardDTO } from '../../models/Cards/CardDTO'
import { useState, useEffect } from 'react'
import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO'
import getCardDetailedDTO from '../../api/cards/getCardDetailedDTO'
import { getConditionsOwned } from '../../api/mycards/myCards'
import { CardConditionOwnedDTO } from '../../models/MyCards/CardConditionsOwnedDTO'
import QtyOwned from './QtyOwned'

interface Props {
    card: CardDTO
}

const CardPopup = ({ card }: Props) => {
    const [cardDetailedDTO, setCardDetailedDTO] = useState<CardDetailedDTO | null>(null);
    const [conditionsOwned, setConditionsOwned] = useState<CardConditionOwnedDTO[]>([]);
    const rarities = ["Common", "Uncommon", "Rare", "Mythic Rare"]

    useEffect(() => {
        (async () => {
            const cardDTO = await getCardDetailedDTO(card.id);
            setCardDetailedDTO(cardDTO);

            const conditionDTOs = await getConditionsOwned(card.id);
            setConditionsOwned(conditionDTOs);
        })();
    }, []);

    return (
        <div className="popup-content">
            <div className="card-image-large-wrapper">
                {card.isFoil && <div className="foil-cover"></div>}
                <img className="card-image-large" src={"https://" + card.imageURL} alt={card.name} />
            </div>
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
                    {cardDetailedDTO && <QtyOwned cardDetailedDTO={cardDetailedDTO} conditionsOwned={conditionsOwned} />}
                </div>
            </div>
        </div>
    )
}

export default CardPopup