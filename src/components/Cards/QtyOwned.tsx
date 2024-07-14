import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO';
import { CardConditionOwnedDTO } from '../../models/MyCards/CardConditionsOwnedDTO';
import ButtonGroup from './ButtonGroup'

interface Props {
    cardDetailedDTO: CardDetailedDTO,
    conditionsOwned: CardConditionOwnedDTO[],
    updateConditionOwned: (newConditionOwned: CardConditionOwnedDTO) => void
}

const QtyOwned = ({ cardDetailedDTO, conditionsOwned, updateConditionOwned }: Props) => {
    const cardId = cardDetailedDTO.cardDTO.id;

    return (
        <>
            {cardDetailedDTO.cardConditions.map(condition => {
                const conditionOwned = conditionsOwned.find(co => co.condition === condition.condition);

                return (
                    <div className="card-condition-row" key={condition.condition}>
                        <div className="card-condition">{condition.condition}</div>
                        <div className="card-quantity"> {condition.quantity}</div>
                        <div className="card-price">${condition.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <ButtonGroup
                            conditionOwned={conditionOwned ?? {
                                cardId: cardId,
                                condition: condition.condition,
                                quantity: 0
                            }}
                            updateConditionOwned={updateConditionOwned} />
                    </div>
                )
            })}
        </>
    )
}

export default QtyOwned