import { CardDTO } from '../../models/Cards/CardDTO'
import { useState, useEffect } from 'react'
import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO'
import getCardDetailedDTO from '../../api/cards/getCardDetailedDTO'

interface Props {
    card: CardDTO
}

const CardPopup = ({ card }: Props) => {
    const [cardDetailedDTO, setCardDetailedDTO] = useState<CardDetailedDTO | null>(null);

    useEffect(() => {
        (async () => {
            const dto = await getCardDetailedDTO(card.id);
            setCardDetailedDTO(dto);
        })();
    }, []);

    return (
        <div className="popup-content">
            <h2>{card.name}</h2>
            <img src={"https://" + card.imageURL} alt={card.name} />
            <p>Edition: {card.editionName}</p>
            <ul>
                {cardDetailedDTO &&
                    cardDetailedDTO.cardConditions.map(condition => (
                        <li key={condition.condition}>
                            {condition.condition}: {condition.quantity} @ {condition.price}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default CardPopup