const passportServices = require('passport');
const authResponseFormatter = require('../responseFormatter/http/authResponses');

module.exports = {
    login(req, res, next) {
        passportServices.authenticate('local', (error, user, info) => {
            if (error) throw err
            if (!user) 
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Incorrect Username or Password'
                }
            })
            // authResponseFormatter.responseUserErr(
            //     res, null, false, null, {message: 'Incorrect Username or Password'}
            // )
            else {
                req.logIn(user, err => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: "Server Error",
                        })
                        // authResponseFormatter.responseServerErr(
                        //     res, null, false, {message: 'Server Error'}, null
                        // )
                    }
                    return res.status(200).json({
                        success: true,
                        message: "User successfully login",
                        user: req.user,
                    })
                    // authResponseFormatter.responseSuccessLogin(
                    //     res, req.user, true, {message: 'User successfully logged in'}, null
                    // )
                })
            }
        })(req, res, next)
    }
}