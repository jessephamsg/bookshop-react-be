const bcrypt = require('bcrypt');
const User = require('../models/User')
const passwordValidatorService = require('../services/passwordValidatorSvc');
const authResponseFormatter = require('../services/httpResServices/http/authResponses');

module.exports = {
    async changeLocalPassword(req,res,next) {
        try {
            const { id, currentPassword, password, password2 } = req.body
            let errors = await passwordValidatorService.validatePassword(password, password2);
            const existingPassword = await User.findById(id, 'password')
            if (errors.length > 0) authResponseFormatter.responseCreateAccErr(res, null, false, null, errors)
            const validateCurrentPassword = await bcrypt.compare(currentPassword, existingPassword.password, async (err, isMatch) => {
                try {
                    if (isMatch) {
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
                    } else {
                        authResponseFormatter.responseServerErr(res, null, false, null, [{message:'Current Password do not Match'}])
                    }
                } catch (err) {
                    throw err;
                }
            })
        } catch (err) {
            console.log(err.message)
        }
        
    }
}