const User = require('../models/User')
const authResponseFormatter = require('../services/httpResServices/http/authResponses');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const passwordValidatorService = require('../services/passwordValidatorSvc');

module.exports = {
    async verifyUserEmail (req,res,next) {
        try {
            const { email } = req.body;
            const response = await User.findOne({ email: email })
            console.log(response)
            if (response == null) authResponseFormatter.responseOK(res, null, false, null, 'Email is not registered with us')
            else if (response && response.googleUser) authResponseFormatter.responseOK(res, null, false, null, 'Please use an email which is not Authorized by Google' )
            else {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'singaporerewardstracker@gmail.com',
                        pass: 'Hateherla1!'
                    }
                });
                var mailOptions = {
                    from: 'singaporerewardstracker@gmail.com',
                    to: response.email,
                    subject: 'Password Reset Link',
                    text: `Click on the below link to reset your password \n https://bookshop-react-fe.herokuapp.com/forgetpassword/reset/${response._id}`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        authResponseFormatter.responseOK(res, null, true, 'A reset password link has been sent to your email address', null)
                    }
                });
            }
        } catch (err) {
            throw err;
        } 
    },

    async passwordReset (req,res,next) {
        try {
            console.log(req.body)
            const { password, password2, id } = req.body;
            let errors = await passwordValidatorService.validatePassword(password, password2);
            if (errors.length > 0) authResponseFormatter.responseOK(res, null, false, null, errors)
            else {
                bcrypt.genSalt(10, async (err, salt) => {
                    try {
                        let hash = await bcrypt.hash(password, salt)
                        await User.findByIdAndUpdate(id, {
                            password: hash
                        })
                        authResponseFormatter.responseOK(res, null, true, 'Password Successfully Changed!', null)
                    } catch (err) {
                        throw err;
                    }
            })
            }
        } catch (err) {
            throw err;
        }
    }
}