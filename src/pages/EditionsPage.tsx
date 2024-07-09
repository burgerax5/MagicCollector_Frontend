import { useState, useEffect } from 'react';
import getEditionsGrouped from '../api/editions/editionsGrouped';
import EditionGroupComponent from '../components/EditionGroupComponent';
import EditionAZ from '../components/FilterComponents/EditionAZ';
import { EditionGroup } from '../models/Editions/EditionGroup';
import '../styles/editions.css'

const EditionsPage = () => {
    const [editionGroups, setEditionGroups] = useState<EditionGroup[][]>([])

    useEffect(() => {
        (async () => {
            const groupedEditions = await getEditionsGrouped();
            const numGroups = groupedEditions.length;
            const midpoint = Math.floor(numGroups / 2);

            const left = groupedEditions.slice(0, midpoint);
            const right = groupedEditions.slice(midpoint);

            setEditionGroups([left, right]);
        })();
    }, []);

    return (
        <div className="editions-container">
            <h1>All Editions</h1>
            <EditionAZ />
            <div className="edition-columns">
                {editionGroups.map(column => (
                    <div>
                        {column.map(editionGroup => (
                            <EditionGroupComponent key={editionGroup.header + "-group"} group={editionGroup} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditionsPage