const Book = require('../models/Book');
const QUERY_LIMIT = 50;
const utils = require('./utils/utils');
const errUtils = require('./utils/error');
const Fuse = require('fuse.js');

module.exports = {
    async getByFilter(filter) {
        try {
            const results = await Book.find(filter);
            return results
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('getByFilter', err))
        }
    },
    async getAll() {
        try {
            const results = await this.getByFilter({});
            return results
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('getAll', err));
        }
    },
    async createOne(newBook) {
        try {
            const result = await Book.create(newBook);
            return result
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('createOne', err));
        }
    },
    async createMany(data) {
        try {
            const results = await Book.insertMany(data);
            return results;
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('createMany', err))
        }
    },
    async sortAndLimit(sortCriteria, returnLength) {
        try {
            const results = await Book.find({}).sort(sortCriteria)
            const filteredResults = results.slice(0, returnLength);
            return filteredResults;
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('sortAndLimit', err));
        }
    },
    async getBestSelling() {
        const tenBestSelling = await this.sortAndLimit({
            purchaseQty: -1
        }, 10);
        return tenBestSelling;
    },
    async getHighestRating() {
        try {
            const books = await this.getAll();
            books.forEach(async book => {
                await this.updateOne(book._id, {
                    avgRating: utils.getAvg(book.rating)
                })
            });
            const tenHighestRating = await this.sortAndLimit({
                avgRating: -1
            }, 10);
            return tenHighestRating;
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('getHighestRating', err));
        }
    },
    async updateOne(objectID, valueToUpdate) {
        try {
            const result = await Book.findByIdAndUpdate({
                    _id: objectID
                },
                valueToUpdate
            )
            return result
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('updateOne', err));
        }
    },
    async getByPagination (filter) {
        try {
            const query = filter;
            const options = {
                limit: QUERY_LIMIT,
            }
            const results = await Book.paginate(filter, options,
                (err, result) => {
                    return result.docs;
                })
            return results
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('getByPagination', err))
        }
    },
    async getByFuzzySearch (searchText) {
        try {
            const list = await this.getAll();
            const options = {
                includeScore: true,
                keys: ['title', 'author', 'theme']
            }
            const fuse = new Fuse(list, options);
            const result = fuse.search(searchText);
            return result
        } catch (err) {
            throw new Error(errUtils.buildDBErrMessage('getByFuzzySearch', err))
        }
    }
}