import { EditionGroup } from "../../models/Editions/EditionGroup";
import apiURL from "../config";

const getEditionsGrouped = async () => {
    const url = apiURL + '/api/editions/grouped';
    const editionsGrouped = await fetch(url)
        .then(response => response.json()) as EditionGroup[];
    return editionsGrouped;
}

export default getEditionsGrouped;