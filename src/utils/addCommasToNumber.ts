const addCommasToNumber = (value: number, to2dp = false) => {
    if (to2dp) return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default addCommasToNumber;