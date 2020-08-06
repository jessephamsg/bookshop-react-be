//const mongoose = require('mongoose')

module.exports = {
    getUser (req, res, next) {
        res.send(req.user)
    }
}