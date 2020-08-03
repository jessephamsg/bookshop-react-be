const bookServices = require('../services/bookServices');
const bookResponseFormatter = require('../services/httpResServices/http/bookRepoResponses');

module.exports = {
    async getAll(req, res) {
        const results = await bookServices.getAll();
        try {
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    },
    async getHomePageData (req, res) {
        try {
            const results = await bookServices.getHomePageData();
            bookResponseFormatter.responseOK(req, res, results);
        } catch (err) {
            bookResponseFormatter.responseNotFound(req, res, results);
        }
    }
}