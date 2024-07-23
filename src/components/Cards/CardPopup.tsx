import { CardDTO } from '../../models/Cards/CardDTO'
import { useState, useEffect } from 'react'
import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO'
import getCardDetailedDTO from '../../api/cards/getCardDetailedDTO'
import { getConditionsOwned } from '../../api/mycards/myCards'
import { CardConditionOwnedDTO } from '../../models/UserCards/CardConditionsOwnedDTO'
import QtyOwned from './QtyOwned'
import { useDispatch, useSelector } from 'react-redux'
import { AddCardOwnedAction, DeleteCardOwnedAction, UpdateCardOwnedAction } from '../../redux/actions/actions'
import { RootState } from '../../redux/reducers/rootReducer'

interface Props {
    card: CardDTO
}

const CardPopup = ({ card }: Props) => {
    const [cardDetailedDTO, setCardDetailedDTO] = useState<CardDetailedDTO | null>(null);
    const [initConditionsOwned, setInitConditionsOwned] = useState<CardConditionOwnedDTO[]>([]); // Won't be altered
    const rarities = ["Common", "Uncommon", "Rare", "Mythic Rare"];

    const conditionsOwned = useSelector((state: RootState) => state.cardsOwned);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const cardDTO = await getCardDetailedDTO(card.id);
            setCardDetailedDTO(cardDTO);

            const conditionDTOs = await getConditionsOwned(card.id);
            setInitConditionsOwned(conditionDTOs);
        })();
    }, [card.id]);

    useEffect(() => {
        initConditionsOwned.forEach(conditionOwned => {
            let index = conditionsOwned.old.findIndex(co => co.condition === conditionOwned.condition)
            if (index === -1) {
                dispatch(AddCardOwnedAction("old", conditionOwned))
            }

            index = conditionsOwned.new.findIndex(co => co.condition === conditionOwned.condition)
            if (index === -1) {
                dispatch(AddCardOwnedAction("new", conditionOwned))
            }
        });
    }, [initConditionsOwned]);

    const updateConditionOwned = (newConditionOwned: CardConditionOwnedDTO) => {
        let index = conditionsOwned.new.findIndex(co => co.condition === newConditionOwned.condition);

        // Add condition owned
        if (index === -1 && newConditionOwned.quantity > 0) {
            dispatch(AddCardOwnedAction("new", newConditionOwned));
        }
        // Delete condition owned
        else if (index >= 0 && newConditionOwned.quantity === 0) {
            const condition = newConditionOwned.condition;
            dispatch(DeleteCardOwnedAction("new", condition));
        }
        // Update condition owned
        else if (index >= 0) {
            dispatch(UpdateCardOwnedAction("new", newConditionOwned));
        }
    }

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
                    {cardDetailedDTO &&
                        <QtyOwned
                            cardDetailedDTO={cardDetailedDTO}
                            conditionsOwned={conditionsOwned.new}
                            updateConditionOwned={updateConditionOwned} />}
                </div>
            </div>
        </div>
    )
}

export default CardPopup