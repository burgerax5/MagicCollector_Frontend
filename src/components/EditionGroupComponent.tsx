import { Link } from 'react-router-dom'
import { EditionGroup } from '../models/Editions/EditionGroup'

type Props = {
    group: EditionGroup
}

const EditionGroupComponent = ({ group }: Props) => {
    if (group.editions.length === 0) return <></>

    return (
        <ul className="editions-group">
            <h2 id={group.header}>{group.header}</h2>
            {group.editions.map(edition => (
                <li key={edition.code + "-li"}>
                    <Link key={edition.code} to={`/cards?editionId=${edition.editionId}`}>
                        {edition.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default EditionGroupComponent