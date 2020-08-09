const Book = require('../models/Book')
const authResponseFormatter = require('../services/httpResServices/http/authResponses');


module.exports = {
    async updateBookReview (req, res) {
        try {
            const { name, email, review, rating, booksData } = req.body;
            let objBooks = { name: name, rating: rating, review: review}
console.log(req.body)
            const booksUpdate = await Book.findByIdAndUpdate(booksData.id, 
                { $push: { reviews: objBooks }}, {upsert: true})
//             console.log(booksUpdate)
            authResponseFormatter.responseOK(res, booksUpdate, true, 'Reviews successfully added!', null)
        } catch (err) {
            console.log(err)
            authResponseFormatter.responseServerErr(res, null, false, null, err)
        }
    }
}
