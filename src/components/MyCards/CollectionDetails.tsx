import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/rootReducer'
import addCommasToNumber from '../../utils/addCommasToNumber';

const CollectionDetails = () => {
    const { totalCards, totalValue } = useSelector((state: RootState) => state.collectionDetails);

    return (
        <div className="collection-details">
            <div className="total-cards">
                <div>Total Cards</div>
                <div className="count">{addCommasToNumber(totalCards)}</div>
            </div>
            <div className="total-value">
                <div>Estimated Value</div>
                <div className="price">${addCommasToNumber(totalValue)}</div>
            </div>
        </div>
    )
}

export default CollectionDetails