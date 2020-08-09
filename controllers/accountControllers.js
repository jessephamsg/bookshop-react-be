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
        try {
            const result = await accountServices.getUserOrderHistory(userEmail);
            authResponseFormatter.responseOK(res, result, true, 'Successfully fetched book data', null);
        } catch (err) {
            authResponseFormatter.responseServerErr(res, {}, false, null, 'Cannot fetch user order history');
        }
    },
    async changeUserProfile (req,res,next) {
        try {
            const { name, id, email } = req.body
            const updatedUserData = await accountServices.updateUserProfile(id, {name: name, email: email});
            authResponseFormatter.responseOK(res, null, true, 'User Profile is successfully updated', null)
        } catch (err) {
            authResponseFormatter.responseServerErr(res, null, false, null, 'Server Error')
        }
    }
}