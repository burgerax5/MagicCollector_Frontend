import { Edition } from "../../models/Edition";

const getEditions = async () => {
    const url = 'https://localhost:44321/api/editions';
    const editions = await fetch(url)
        .then(response => response.json()) as Edition[];
    return editions;
}

export default getEditions;