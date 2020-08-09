const Book = require('../models/Book')
const authResponseFormatter = require('../services/httpResServices/http/authResponses');


module.exports = {
    async updateBookReview (req, res) {
        try {
            const { bookID, rating, review, userName } = req.body;
            const booksUpdate = await Book.findByIdAndUpdate(bookID, {
                $push: { reviews: { name: userName, rating: rating, review: review }, rating: rating } 
            })
            authResponseFormatter.responseOK(res, booksUpdate, true, 'Reviews successfully added!', null)
        } catch (err) {
            console.log(err)
            authResponseFormatter.responseServerErr(res, null, false, null, err)
        }
    }
}
