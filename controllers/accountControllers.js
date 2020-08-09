const authResponseFormatter = require('../services/httpResServices/http/authResponses');
const accountServices = require('../services/accountServices');


module.exports = {
    async updateUserOrderHistory (req, res) {
        const userEmail = req.body.email;
        const orders = req.body.orders;
        try {
            await accountServices.updateUserOrderHistory (userEmail, orders);
            authResponseFormatter.responseOK(res, null, true, 'Updated User History', null);
        } catch (err) {
            authResponseFormatter.responseServerErr(res, {}, false, null, 'Cannot update user order history');
        }
    },
    async getUserOrderHistory (req, res) {
        const userEmail = req.query.query;
        console.log(req.query);
        try {
            const result = await accountServices.getUserOrderHistory(userEmail);
            authResponseFormatter.responseOK(res, result, true, 'Successfully fetched book data', null);
        } catch (err) {
            authResponseFormatter.responseServerErr(res, {}, false, null, 'Cannot fetch user order history');
        }
    }
}