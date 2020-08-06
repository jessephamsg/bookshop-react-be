const authResponseFormatter = require('../responseFormatter/http/authResponses');

module.exports = {
    logout (req,res,next) {
        req.logout()
        // return res.status(200).json({
        //     success: true,
        //     message: 'User successfuly logged out'
        // })
        authResponseFormatter.responseSuccessLogOut(res, null, true, 'User successfully logged out', null)
    }
}