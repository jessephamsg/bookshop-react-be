const bookServices = require('../services/bookServices');
const bookResponseFormatter = require('../responseFormatter/http/bookRepoResponses');

module.exports = {
    async getAll(req, res) {
        const results = await bookServices.getAll();
        try {
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    }
}