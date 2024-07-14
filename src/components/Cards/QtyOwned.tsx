import { CardDetailedDTO } from '../../models/Cards/CardDetailedDTO';
import { CardConditionOwnedDTO } from '../../models/MyCards/CardConditionsOwnedDTO';
import ButtonGroup from './ButtonGroup'

interface Props {
    cardDetailedDTO: CardDetailedDTO,
    conditionsOwned: CardConditionOwnedDTO[]
}

const QtyOwned = ({ cardDetailedDTO, conditionsOwned }: Props) => {
    return (
        <>
            {cardDetailedDTO.cardConditions.map(condition => {
                const initQty = conditionsOwned.find(co => co.condition === condition.condition)?.quantity;

                return (
                    <div className="card-condition-row" key={condition.condition}>
                        <div className="card-condition">{condition.condition}</div>
                        <div className="card-quantity"> {condition.quantity}</div>
                        <div className="card-price">${condition.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <ButtonGroup initQty={initQty ?? 0} />
                    </div>
                )
            })}
        </>
    )
}

export default QtyOwned