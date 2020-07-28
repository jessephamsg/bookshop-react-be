const STRING_JOIN_AT_SPACE = ' ';
const PERCENTAGE_SIGN = '%';
const stringFormatter = require('./stringParsers/stringFormatter');

module.exports = class Book {
    constructor(id, title, author, img, description, originalPrice, discountedPrice, quantity, theme, avgRating, format, publisher, purchaseQty, arrivedOn, daysFromArrival, reviews, dimensions, rating) {
        Object.assign(this, {
            id,
            title,
            author,
            img,
            description,
            originalPrice,
            discountedPrice,
            quantity,
            theme,
            avgRating,
            format,
            publisher,
            purchaseQty,
            arrivedOn,
            daysFromArrival,
            reviews,
            dimensions,
            rating
        })
    }
    formatTitle() {
        return stringFormatter.formatNames(this.title).join(STRING_JOIN_AT_SPACE);
    }
    formatAuthor() {
        return stringFormatter.formatNames(this.author).join(STRING_JOIN_AT_SPACE);
    }
    showSynopsis() {
        return this.description.slice(0, 50);
    }
    formatSellingPrice() {
        return stringFormatter.formatPrices(this.discountedPrice);
    }
    formatOriginalPrice() {
        return stringFormatter.formatPrices(this.originalPrice);
    }
    calculateAmtSaved() {
        return (((this.originalPrice - this.discountedPrice) / this.originalPrice * 100).toFixed(1)).toString() + PERCENTAGE_SIGN;
    }
    shortenImgUrl() {
        return this.img.slice(0, 50);
    }
}