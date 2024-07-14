const getResultsRange = (currentPage: number, resultsPerPage: number, totalResults: number | undefined) => {
    if (!totalResults) return {}

    const startRange = (currentPage - 1) * resultsPerPage + 1;
    const endRange = Math.min(currentPage * resultsPerPage, totalResults);
    return { startRange, endRange };
};

export default getResultsRange;