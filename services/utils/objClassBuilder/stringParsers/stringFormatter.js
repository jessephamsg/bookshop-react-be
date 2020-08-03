const STRING_SPLIT_AT_SPACE = ' ';
const DOLLAR_SIGN = '$';

module.exports = {
    formatNames(nameStr) {
        const nameArr = nameStr.split(STRING_SPLIT_AT_SPACE);
        const capitalNameArr = []
        nameArr.forEach(name => capitalNameArr.push(name.charAt(0).toUpperCase() + name.slice(1)));
        return capitalNameArr;
    },
    formatPrices(price) {
        return DOLLAR_SIGN + price.toString()
    }
}