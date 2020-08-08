const User = require('../models/User');
const { findByIdAndUpdate } = require('../models/User');
const authResponseFormatter = require('../services/httpResServices/http/authResponses');

module.exports = {
    async changeUserProfile (req,res,next) {
        try {
            console.log(req.body)
            const { name, id, email } = req.body
            const updatedUserData = await User.findByIdAndUpdate(id, {
                name: name,
                email: email
            })
            console.log(updatedUserData)
            authResponseFormatter.responseOK(res, updatedUserData, true, 'User Profile is successfully updated', null)
        } catch (err) {
            console.log(err)
            authResponseFormatter.responseServerErr(res, null, false, null, 'Server Error')
        }
    }
}