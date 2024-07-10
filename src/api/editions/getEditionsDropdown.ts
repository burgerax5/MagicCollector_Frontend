import { EditionDropdown } from "../../models/Editions/EditionDropdown";


const getEditionsDropdown = async () => {
    const url = 'https://localhost:44321/api/editions/dropdown';
    const editionsDropdown = await fetch(url)
        .then(response => response.json()) as EditionDropdown[];
    return editionsDropdown;
}

export default getEditionsDropdown;