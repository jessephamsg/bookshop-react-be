const axios = require('axios');
const passportServices = require('passport');
const authResponseFormatter = require('../services/httpResServices/http/authResponses');
const accountServices = require('../services/accountServices');
const passwordValidatorService = require('../services/passwordValidatorSvc');
const GOOGLE_AUTH_API = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';

const User = require('../models/User')
const bcrypt = require('bcrypt');

module.exports = {
    async addUser(req, res, next) {
        try {
            const { name, email, password, password2 } = req.body;
            let errors = []
            password !== password2 && errors.push({ message: "Password do not match" })
            password.length < 6 && errors.push({ message: "Password should be at least 6 character" })

            if (errors.length > 0) {
                return res.status(422).json({
                    success: false,
                    error: errors
                })
            } else {
                const newUser = await User.findOne({ email: email })
                if (newUser) {
                    errors.push({ message: "Email is already registered" })
                    return res.status(422).json({
                        success: false,
                        error: errors
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    bcrypt.genSalt(10, async (err, salt) => {
                        try {
                            const hash = await bcrypt.hash(newUser.password, salt)
                            newUser.password = hash
                            await newUser.save()
                            return res.status(201).json({
                                success: true,
                                message: "User successfully created",
                                data: newUser
                            })
                        } catch (err) {
                            console.log(err)
                            const error = err._message
                            return res.status(500).json({
                                success: false,
                                msg: "Server Error",
                                error: {msg: error}
                            })
                        }
                    })
                }
            }

        } catch (err) {
            const error = err._message
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    async addGoogleUser(req, res, next) {
        try {
            const {
                name,
                email,
            } = req.body;
            const newUser = await accountServices.googleAuthFindOne({
                email: email
            })
            if (newUser) {
                authResponseFormatter.responseSuccessLogin(res, null, true, 'Email is already registered', null)
            } else {
                const newUser = await accountServices.createGoogleUser(name, email);
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
    }
}