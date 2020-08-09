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
            throw new Error(errUtils.buildAuthRepoErrMsg('updateUserOrderHistoryByEmail'), err);
        }
    }
}