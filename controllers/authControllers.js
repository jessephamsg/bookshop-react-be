const axios = require('axios');
const passportServices = require('passport');
const authResponseFormatter = require('../services/httpResServices/http/authResponses');
const accountServices = require('../services/accountServices');
const passwordValidatorService = require('../services/passwordValidatorSvc');
const GOOGLE_AUTH_API = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';


module.exports = {
    async addUser(req, res, next) {
        try {
            const {
                name,
                email,
                password,
                password2
            } = req.body;
            let errors = passwordValidatorService.validatePassword(password, password2);
            if (errors.length > 0) {
                authResponseFormatter.responseCreateAccErr(res, null, false, null, errors)
            } else {
                const newUser = await accountServices.findOne({
                    email: email
                })
                if (newUser) {
                    errors.push({
                        msg: "Email is already registered"
                    })
                    authResponseFormatter.responseCreateAccErr(res, null, false, null, errors)
                } else {
                    const result = await accountServices.createOne(name, email, password);
                    if (result) {
                        authResponseFormatter.responseSuccessAcc(res, newUser, true, "User successfully created", null)
                    } else {
                        authResponseFormatter.responseServerErr(res, null, false, null, 'Server Error');
                    }
                }
            }
        } catch (err) {
            const error = err._message
            authResponseFormatter.responseServerErr(res, null, false, 'Server Error', null);
        }
    },
    async addGoogleUser(req, res, next) {
        try {
            const {
                name,
                email,
                googleId,
                imageUrl
            } = req.body;
            const newUser = await accountServices.googleAuthFindOne({
                email: email
            })
            if (newUser) {
                authResponseFormatter.responseSuccessLogin(res, null, true, 'Email is already registered', null)
            } else {
                const newUser = await accountServices.createGoogleUser(name, email, googleId, imageUrl);
                authResponseFormatter.responseSuccessAcc(res, newUser, true, 'User successfully created', null)
            }
        } catch (err) {
            const error = err._message
            authResponseFormatter.responseServerErr(res, null, false, null, {
                msg: error
            })
        }
    },
    async googleAuth(req, res, next) {
        try {
            const id = Object.keys(req.body)
            const response = await axios.get(`${GOOGLE_AUTH_API}${id[0]}`)
            const existingUser = await accountServices.googleAuthFindOne({
                email: response.data.email
            })
            if (existingUser) {
                authResponseFormatter.responseSuccessLogin(res, response.data, true, 'User Authenticated', null)
            }
        } catch (err) {
            authResponseFormatter.responseServerErr(res, null, false, null, 'User is not authenticated')
        }
    },
    getUser(req, res, next) {
        res.send(req.user)
        console.log(req)
    },
    login(req, res, next) {
        passportServices.authenticate('local', (error, user, info) => {
            if (error) throw err
            if (!user)
                authResponseFormatter.responseUserErr(
                    res, null, false, null, {
                        message: 'Incorrect Username or Password'
                    }
                )
            else {
                req.logIn(user, err => {
                    if (err) {
                        authResponseFormatter.responseServerErr(res, null, false, null, 'Server Error');
                    }
                    authResponseFormatter.responseSuccessLogin(res, req.user, true, {
                        message: 'User successfully logged in',
                    }, null)
                })
            }
        })(req, res, next)
    },
    logout(req, res, next) {
        req.logout()
        authResponseFormatter.responseSuccessLogOut(res, null, true, 'User successfully logged out', null)
    },
}