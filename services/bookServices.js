const bookRepositories = require('../repositories/bookRepositories');
const Book = require('../services/utils/objClassBuilder/Book');

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
    formatReturnedData(arr) {
        const books = arr.map(book => {
            return buildBookObject(book)
        });
        const formattedResults = books.map(book => {
            return {
                raw: book,
                formatted: buildFormattedObject(book)
            }
        });
        return formattedResults;
    },
    async getUniqueCategory() {
        const uniqueCat = await bookRepositories.getUniqueCategory();
        return uniqueCat;
    },
    async getAll() {
        const bookData = await bookRepositories.getAll();
        const formattedResults = this.formatReturnedData(bookData);
        return formattedResults;
    },
    async getSearchResults(searchText) {
        const bookData = await bookRepositories.getByFuzzySearch(searchText);
        const itemBookData = bookData.map(book => book.item);
        const formattedResults = this.formatReturnedData(itemBookData);
        return formattedResults
    },
    async getCatListingData(req) {
        const catName = req.params.catName;
        const catListing = await bookRepositories.getByFilter({theme: catName});
        const formattedResults = this.formatReturnedData(catListing);
        return formattedResults;
    },
    async getBookDetail(req) {
        const bookID = req.params.bookID;
        const bookDetail = await bookRepositories.getByFilter({_id: bookID});
        const formattedResults = this.formatReturnedData(bookDetail);
        return formattedResults;
    },
    async getBookDataByCategory (category, limit) {
        const results = await bookRepositories.getBookDataByCategories(category, limit);
        const formattedResults = this.formatReturnedData(results);
        return formattedResults
    },
    async getBookByID (bookId) {
        const result = await bookRepositories.getBookById(bookId);
        const formattedResult = this.formatReturnedData([result]);
        return formattedResult
    }
}