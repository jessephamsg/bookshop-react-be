//const mongoose = require('mongoose')

module.exports = loginHandler = {
    getUser: (req, res, next) => {
        res.send(req.user)
    }
}