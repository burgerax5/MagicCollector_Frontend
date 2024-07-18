import { EditionDropdown } from "../../models/Editions/EditionDropdown";
import apiURL from "../config";


const getEditionsDropdown = async () => {
    const url = apiURL + '/api/editions/dropdown';
    const editionsDropdown = await fetch(url)
        .then(response => response.json()) as EditionDropdown[];
    return editionsDropdown;
}

export default getEditionsDropdown;