const passport = require('passport')

module.exports = loginHandler = {
    login: (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if(error) throw err
            if(!user) return res.status(401).json({
                success: false,
                error: {message: 'Incorrect Username or Password'}
            })
            else {
                req.logIn(user,err => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: "Server Error",
                        })  
                    }
                    return res.status(200).json({
                        success: true,
                        message: "User successfully login",
                        user: req.user,
                    })
                })
            }
        })(req, res, next)
    }
}