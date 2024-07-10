import React from 'react'
import { Link } from 'react-router-dom'
import { CardDTO } from '../../models/Cards/CardDTO'

interface Props {
    card: CardDTO
}

const Card = ({ card }: Props) => {
    return (
        <div className="card" onClick={() => console.log(card.name)}>
            <Link className="card-edition" to="/">{card.editionName}</Link>
            <img className="card-image" src={"https://" + card.imageURL} alt={card.name} />
            <div>
                <div className="card-name">{card.name}</div>
                <div className="card-price">
                    ${card.nmPrice}
                </div>
            </div>
        </div>
    )
}

export default Card