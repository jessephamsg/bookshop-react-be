const Google = require('../models/Google')

module.exports = google = {
    addGoogleUser: async (req, res, next) => {
        try {
            const { name, email, googleId, imageUrl } = req.body;
            const newUser = await Google.findOne({ email: email })
            if (newUser) {
                return res.status(200).json({
                    success: true,
                    msg: "Email is already registered"
                })
            } else {
                const newUser = new Google({
                    name,
                    email,
                    googleId,
                    imageUrl
                })
                await newUser.save()
                return res.status(201).json({
                    success: true,
                    msg: "User successfully created",
                    data: newUser
                })
            }
        } catch (err) {
            const error = err._message
            return res.status(500).json({
                success: false,
                error: {msg:error}
            })
        }

    }
}