const User = require('../models/User')
const bcrypt = require('bcrypt')


module.exports = registerHandler = {
    //@route  POST '/'
    addUser: async (req, res, next) => {
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
                    errors.push({ msg: "Email is already registered" })
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
                                data: newUser // remove this line
                            })
                        } catch (err) {
                            console.log(err)
                            const error = err._message
                            return res.status(500).json({
                                success: false,
                                message: "Server Error",
                                error: error
                            })
                        }
                    })
                }
            }

        } catch (err) {
            const error = err._message
            console.log(err.message)
            return res.status(500).json({
                success: false,
                error: error // -> error array
            })
        }
    },
}


