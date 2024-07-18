import { Edition } from "../../models/Editions/Edition";
import apiURL from "../config";

const getEditions = async () => {
    const url = apiURL + '/api/editions';
    const editions = await fetch(url)
        .then(response => response.json()) as Edition[];
    return editions;
}

export default getEditions;