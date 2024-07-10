import { EditionGroup } from "../../models/Editions/EditionGroup";

const getEditionsGrouped = async () => {
    const url = 'https://localhost:44321/api/editions/grouped';
    const editionsGrouped = await fetch(url)
        .then(response => response.json()) as EditionGroup[];
    return editionsGrouped;
}

export default getEditionsGrouped;