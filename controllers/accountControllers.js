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
    }
}