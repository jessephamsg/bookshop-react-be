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
                return res.status(200).json({
                    success: true,
                    message: 'user authenticated',
                    data: response.data // user data / email address or correct user CRUD operation
                })
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'User is not authenticated'
            })
        }
    }
}