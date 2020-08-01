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
    }
}