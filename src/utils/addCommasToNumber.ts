const addCommasToNumber = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export default addCommasToNumber;