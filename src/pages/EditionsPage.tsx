import { useState, useEffect } from 'react';
import getEditionsGrouped from '../api/editions/editionsGrouped';
import EditionGroupComponent from '../components/EditionGroupComponent';
import EditionAZ from '../components/FilterComponents/EditionAZ';
import { EditionGroup } from '../models/EditionGroup';
import '../styles/editions.css'

const EditionsPage = () => {
    const [editionGroups, setEditionGroups] = useState<EditionGroup[]>([])

    useEffect(() => {
        (async () => {
            const fetchedEditions = await getEditionsGrouped();
            setEditionGroups(fetchedEditions);
        })();
    }, []);

    return (
        <div>
            <h1>All Editions</h1>
            <EditionAZ />
            {editionGroups.map(editionGroup => (
                <EditionGroupComponent group={editionGroup} />
            ))}
        </div>
    )
}

export default EditionsPage