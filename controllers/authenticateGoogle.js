const mongoose = require('mongoose')
const axios = require('axios')
const Google = require('../models/Google')

module.exports = authenticateGoogle = {
    googleAuth: async (req, res, next) => {
        try {
            const id = Object.keys(req.body)
            console.log(id[0])
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id[0]}`)
            console.log(response.data.email)
            console.log(response.data.name)
            const existingUser = await Google.findOne({ email: response.data.email })
            if (existingUser) {
                req.existingUser = {
                    name: existingUser.name,
                    email: existingUser.email
                };
                next();
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'User is not authenticated'
            })
        }
    }
}