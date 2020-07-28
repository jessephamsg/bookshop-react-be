const bookRepositories = require('../repositories/bookRepositories');
const Book = require('../responseFormatter/data/Book');

const buildBookObject = ({
    _id,
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
}) => {
    return new Book(_id, title, author, img, description, originalPrice, discountedPrice, quantity, theme, avgRating, format, publisher, purchaseQty, arrivedOn, daysFromArrival, reviews, dimensions, rating)
}

const buildFormattedObject = (object) => {
    return {
        formattedTitle: object.formatTitle(),
        formattedAuthor: object.formatAuthor(),
        formattedOriginalPrice: object.formatOriginalPrice(),
        formattedDiscountedPrice: object.formatSellingPrice(),
    }
}

module.exports = {
    async getAll() {
        const bookData = await bookRepositories.getAll();
        const books = bookData.map(book => {
            return buildBookObject(book)
        });
        const formattedResults = books.map(book => {
            return {
                ...book,
                ...buildFormattedObject(book)
            }
        });
        return formattedResults;
    }
}