//const Google = require('../models/Google')
const authResponseFormatter = require('../responseFormatter/http/authResponses');
const accountServices = require('../services/accountServices');

module.exports = {
    async addGoogleUser (req, res, next) {
        try {
            const { name, email, googleId, imageUrl } = req.body;
            //const newUser = await Google.findOne({ email: email })
            const newUser = await accountServices.googleAuthFindOne({ email: email })
            if (newUser) {
                // return res.status(200).json({
                //     success: true,
                //     msg: "Email is already registered"
                // })
                authResponseFormatter.responseSuccessLogin(res, null, true, 'Email is already registered', null)
            } else {
                // const newUser = new Google({
                //     name,
                //     email,
                //     googleId,
                //     imageUrl
                // })
                // await newUser.save()
                const newUser = await accountServices.createGoogleUser();
                authResponseFormatter.responseSuccessAcc(res, newUser, true, 'User successfully created', null)
                // return res.status(201).json({
                //     success: true,
                //     msg: "User successfully created",
                //     data: newUser
                // })
            }
        } catch (err) {
            const error = err._message
            // return res.status(500).json({
            //     success: false,
            //     error: {msg:error}
            // })
            authResponseFormatter.responseServerErr(res, null, false, null, {msg:error})
        }

    }
}