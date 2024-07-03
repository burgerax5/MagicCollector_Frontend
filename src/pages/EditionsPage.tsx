import Search from '../components/FilterComponents/Search';
import { useState, useEffect } from 'react';
import getEditions from '../api/editions/editions';
import { Edition } from '../models/Edition';

const EditionsPage = () => {
    const [editions, setEditions] = useState<Edition[]>([])

    useEffect(() => {
        (async () => {
            const fetchedEditions = await getEditions();
            setEditions(fetchedEditions);
        })();
    }, []);

    return (
        <div>
            <h1>All Editions</h1>
            <Search placeholderText='n edition' />
            {editions.map(edition => <li>{edition.name}</li>)}
        </div>
    )
}

export default EditionsPage