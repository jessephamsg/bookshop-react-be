const User = require('../models/User');
const errUtils = require('./utils/error');


module.exports = {
    async updateUserOrderHistoryByEmail(email, orderArray) {
        try {
            const result = await User.findOneAndUpdate({
                email
            }, {
                $push: {
                    orders: orderArray
                }
            }, {
                new: true,
                upsert: true
            })
            return result
        } catch (err) {
            throw new Error(errUtils.buildAuthRepoErrMsg('updateUserOrderHistoryByEmail', err));
        }
    },
    async getUserOrderHistory (email) {
        try {
            const userAccount = await User.findOne({email});
            const result = userAccount.orders;
            return result
        } catch (err) {
            throw new Error(errUtils.buildAuthRepoErrMsg('getUserOrderHistory', err));
        }
    }
}