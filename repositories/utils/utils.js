module.exports = {
    getAvg(arr) {
        const sum = arr.reduce((acc, currentVal) => {
            return acc + currentVal
        }, 0)
        const average = sum / (arr.length);
        return average
    }
}