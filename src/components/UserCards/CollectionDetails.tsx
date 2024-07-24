import { RootState } from '../../redux/reducers/rootReducer'
import addCommasToNumber from '../../utils/addCommasToNumber';
import { useSelector } from 'react-redux';

const CollectionDetails = () => {
    const collectionDetails = useSelector((state: RootState) => state.collectionDetails);
    const { totalCards, totalValue } = collectionDetails;

    return (
        <div className="collection-details">
            <div className="total-cards">
                <div>Total Cards</div>
                <div className="count">{addCommasToNumber(totalCards)}</div>
            </div>
            <div className="total-value">
                <div>Estimated Value</div>
                <div className="price">${addCommasToNumber(totalValue, true)}</div>
            </div>
        </div>
    )
}

export default CollectionDetails