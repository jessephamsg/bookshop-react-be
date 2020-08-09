const bookServices = require('../services/bookServices');
const bookResponseFormatter = require('../services/httpResServices/http/bookRepoResponses');
const authResponseFormatter = require('../services/httpResServices/http/authResponses');


module.exports = {
    async getAll(req, res) {
        const results = await bookServices.getAll();
        try {
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getUniqueCategories(req, res) {
        try {
            const results = await bookServices.getUniqueCategory();
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getSearchData(req, res) {
        const query = req.query.query;
        const results = await bookServices.getSearchResults(query);
        try {
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getCatListingData(req, res) {
        try {
            const results = await bookServices.getCatListingData(req);
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getBookData(req, res) {
        const category = req.query.query;
        const limit = parseInt(req.query.limit);
        const results = await bookServices.getBookDataByCategory(category, limit);
        try {
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getBookById(req, res) {
        const bookId = req.params.index;
        const result = await bookServices.getBookByID(bookId);
        try {
            bookResponseFormatter.responseOK(req, res, result);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, result);
        }
    },
    async updateBookPurchaseQty(req, res) {
        const bookArr = req.body;
        try {
            await bookServices.updateBookPurchaseQtyByID(bookArr)
            bookResponseFormatter.responseOK(req, res, {});
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, {});
        }
    },
    async updateBookReview(req, res) {
        try {
            const {
                bookID,
                rating,
                review,
                userName
            } = req.body;
            const booksUpdate = await bookServices.updateBookReview(bookID, {
                name: userName,
                rating: rating,
                review: review
            }, rating)
            authResponseFormatter.responseOK(res, booksUpdate, true, 'Reviews successfully added!', null)
        } catch (err) {
            authResponseFormatter.responseServerErr(res, null, false, null, err)
        }
    }
}