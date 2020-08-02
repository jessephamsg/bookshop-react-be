// const User = require('../models/User');
// const bcrypt = require('bcrypt');
const authResponseFormatter = require('../responseFormatter/http/authResponses');
const accountServices = require('../services/accountServices');

module.exports = {
    //@route  POST '/'
    async addUser(req, res, next) {
        try {
            //res.send(req.body.email)
            const {
                name,
                email,
                password,
                password2
            } = req.body;
            let errors = []
            password !== password2 && errors.push({
                message: "Passwords do not match"
            })
            password.length < 6 && errors.push({
                message: "Password should be at least 6 characters in length"
            })
            if (errors.length > 0) {
                // return res.status(422).json({
                //     success: false,
                //     error: errors
                //})
                authResponseFormatter.responseCreateAccErr(res, null, false, null, errors)
            } else {
                //const newUser = await User.findOne({ email: email })
                const newUser = await accountServices.findOne({
                    email: email
                })
                if (newUser) {
                    errors.push({
                        msg: "Email is already registered"
                    })
                    // return res.status(422).json({
                    //     success: false,
                    //     error: errors
                    // })
                    authResponseFormatter.responseCreateAccErr(res, null, false, null, errors)
                } else {
                    const result = await accountServices.createOne(name, email, password);
                    if (result) {
                        authResponseFormatter.responseSuccessAcc(res, newUser, true, "User successfully created", null)
                    } else {
                        authResponseFormatter.responseServerErr(res, null, false, 'Server Error', null);
                    }
                    //console.log(result);
                    // const newUser = new User({
                    //     name,
                    //     email,
                    //     password
                    // })
                    // bcrypt.genSalt(10, async (err, salt) => {
                    //     try {
                    //         const hash = await bcrypt.hash(newUser.password, salt)
                    //         newUser.password = hash
                    //         await newUser.save()
                    //         // return res.status(201).json({
                    //         //     success: true,
                    //         //     message: "User successfully created",
                    //         //     data: newUser // remove this line
                    //         // })
                    //     } catch (err) {
                    //         const error = err._message
                    //         // return res.status(500).json({
                    //         //     success: false,
                    //         //     message: "Server Error",
                    //         //     error: error
                    //         // })
                    //     }
                    // })
                }
            }
        } catch (err) {
            const error = err._message
            // return res.status(500).json({
            //     success: false,
            //     error: error // -> error array
            // })
            authResponseFormatter.responseServerErr(res, null, false, 'Server Error', null);
        }
    },
}