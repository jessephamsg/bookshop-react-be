//const mongoose = require('mongoose')
const axios = require('axios');
const authResponseFormatter = require('../responseFormatter/http/authResponses');
const accountServices = require('../services/accountServices');
//const Google = require('../models/Google')

module.exports = {
    googleAuth: async (req, res, next) => {
        try {
            const id = Object.keys(req.body)
            //console.log(id[0])
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id[0]}`)
            // console.log(response.data.email)
            // console.log(response.data.name)
            //const existingUser = await Google.findOne({ email: response.data.email })
            const existingUser = await accountServices.googleAuthFindOne({ email: response.data.email })
            if (existingUser) {
                authResponseFormatter.responseSuccessLogin(res, response.data.name, true, 'User Authenticated', null)
                // return res.status(200).json({
                //     success: true,
                //     message: 'user authenticated',
                //     data: response.data.name // user data / email address or correct user CRUD operation
                // })
            }
        } catch (err) {
            // return res.status(500).json({
            //     success: false,
            //     message: 'User is not authenticated'
            // })
            authResponseFormatter.responseServerErr(res, null, false, 'User is not authenticated', null)
        }
    }
}