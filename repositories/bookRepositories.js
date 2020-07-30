const Book = require('../models/Book');
const QUERY_LIMIT = 50;

module.exports = {
    async getByFilter(filter) {
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
            throw new Error(`Database Error: cannot get by filter ${err.message}`)
        }
    },
    async getAll() {
        try {
            const results = await this.getByFilter({});
            return results
        } catch (err) {
            throw new Error(`Database Error: cannot execute getAll request due to ${err.message}`);
        }
    },
    async createOne(newBook) {
        try {
            const result = await Book.create(newBook);
            return result
        } catch (err) {
            throw new Error(`Database Error: cannot execute createOne request due to ${err.message}`);
        }
    },
    async createMany(data) {
        try {
            const results = await Book.insertMany(data);
            return results;
        } catch (err) {
            throw new Error(`Database Error: cannot execute createMany request due to ${err.message}`)
        }
    },
    async sortAndLimit(sortCriteria, returnLength) {
        try {
            const results = await Book.find({}).sort(sortCriteria)
            const filteredResults = results.slice(0, returnLength);
            return filteredResults;
        } catch (err) {
            throw new Error(`Database Error: cannot execute getBestSelling request due to ${err.message}`);
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
            const results = await Book.aggregate([{
                $project: {
                    avgRating: {
                        $avg: '$rating'
                    }
                }
            }]);
            for (const book of results) {
                console.log(results);
                await this.updateOne(book._id, {
                    avgRating: book.avgRating
                });
            }
            const tenHighestRating = await this.sortAndLimit({
                avgRating: -1
            }, 10);
            return tenHighestRating;
        } catch (err) {
            throw new Error(`Database Error: cannot execute getHighestRating request due to ${err.message}`);
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
            throw new Error(`Database Error: cannot execute updateOne request due to ${err.message}`);
        }
    }
}